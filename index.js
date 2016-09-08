const path = require('path');
const alfy = require('alfy');
const co = require('co');
const api = require('./api');
const utils = require('./utils');
const dex = require('./dex');

/**
 * Looks up a single Pokémon by ID or name
 *
 * @param {String} identifier - The Pokémon identifier
 * @return {Promise}
 */
const lookup = exports.lookup = identifier => {
  dex.query(identifier)
    .then(pokemons => {
      const itemsPromises = [];
      if (pokemons) {
        pokemons.forEach(record => {
          const pokemon = dex.lookupById(record.original.id);
          itemsPromises.push(Promise.resolve(pokemon));
        });
      }
      Promise.all(itemsPromises)
        .then(pokemons => {
          if (pokemons) {
            const items = pokemons.map(pokeData => {
              // convert to Alfred output
              return toAlfred(dex.create(pokeData));
            });
            alfy.output(items);
          }
        });
    });
};

/**
 * Converts a Pokémon data object to a valid Alfred item
 *
 * @param {Object} pokemon
 * @return {Object}
 */
const toAlfred = pokemon => ({
  title: pokemon.name,
  subtitle: pokemon.desc,
  arg: utils.getOpenUrl(pokemon.id),
  icon: {
    path: utils.getSpritesPath(pokemon.id),
  },
});

lookup(alfy.input);
