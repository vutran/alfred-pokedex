const path = require('path');
const fs = require('fs-extra');
const co = require('co');
const async = require('async');
const api = require('../api');
const utils = require('../utils');

const BUILD_WORKERS = 5;

const q = async.queue((pokemon, callback) => {
  const b = buildPokemon(pokemon);
  b.then(filePath => {
    callback();
  });
}, BUILD_WORKERS);

q.drain(() => {
  console.log('DONE');
});

// single build
const buildPokemon = pokemon => {
  const fileDir = path.resolve(__dirname, '..', 'data', 'json', 'pokemons');
  const filePath = path.resolve(fileDir, pokemon.id.toString() + '.json');
  return new Promise(resolve => {
    co(function * () {
      const species_name = yield api.fetchSpeciesNameBySpeciesId(pokemon.species_id);
      const species_flavor_text = yield api.fetchSpeciesFlavorTextBySpeciesId(pokemon.species_id);
      const form = yield api.fetchFormsByPokemonId(pokemon.id);
      const form_name = yield api.fetchFormNamesByFormId(form.id);
      const pokeData = {
        pokemon,
        species_name,
        species_flavor_text,
        form,
        form_name,
      };
      fs.mkdirp(fileDir, err => {
        if (!err) {
          fs.writeFile(filePath, JSON.stringify(pokeData), () => {
            resolve(filePath);
          });
        }
      });
    }); // end co
  });
};

// build all
const buildPokemons = () => {
  api.fetchAll()
    .then(pokemons => {
      pokemons.forEach(pokemon => {
        q.push(pokemon, err => {
          if (!err) {
            console.log('Built:', pokemon.id);
          }
        });
      });
    });
};

buildPokemons();
