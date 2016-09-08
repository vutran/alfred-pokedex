const path = require('path');
const fs = require('fs-extra');
const utils = require('./utils');

/**
 * Queries for matched Pokémons (basic data)
 *
 * @param {String} query
 * @return {Promise}
 */
const query = exports.query = query => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, 'data', 'json', 'pokemons.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pokemons = JSON.parse(data);
        resolve(utils.fetchMatching(query, pokemons));
      }
    });
  });
};

/**
 * Looks up a single Pokémon (full data)
 *
 * @param {Integer} id
 * @return {Promise}
 */
const lookupById = exports.lookupById = id => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, 'data', 'json', 'pokemons', id.toString() + '.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

/**
 * Creates a new Pokémon data object
 *
 * @param {Object}
 * @return {Object}
 */
const create = exports.create = ({ pokemon, species_name, species_flavor_text, form_name }) => {
  return {
    id: pokemon.id,
    name: form_name ? form_name.pokemon_name : species_name.name,
    desc: species_flavor_text.flavor_text.replace(/\r|\n|\f/g, ' '),
  };
};
