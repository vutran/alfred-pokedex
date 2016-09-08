const path = require('path');
const alfy = require('alfy');
const utils = require('./utils');

const VERSION_ID = 26;
const LANG_EN = 9;

/**
 * Fetches all Pokémon (pokemon.csv)
 *
 * @return {Promise}
 */
const fetchAll = exports.fetchAll = () => {
  const list = [];
  const file = path.resolve(__dirname, 'data', 'csv', 'pokemon.csv');
  return utils.loadCsv(file);
};

/**
 * Fetches the Pokémon by its identifier
 *
 * @param {Integer} identifier
 * @return {Promise}
 */
const fetchByIdentifier = exports.fetchByIdentifier = identifier => {
  return new Promise(resolve => {
    fetchAll()
      .then(data => {
        const records = data.filter(r => r.identifier === identifier)
        if (records) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      });
  });
};

 /**
  * Fetches the species name (pokemon_species_name.csv)
  * @return {Promise}
  */
const fetchSpeciesNames = exports.fetchSpeciesNames = () => {
    const list = [];
    const file = path.resolve(__dirname, 'data', 'csv', 'pokemon_species_names.csv');
    return utils.loadCsv(file);
};

/**
 * Fetches the species name by the species ID
 *
 * @param {Integer} speciesId
 * @return {Promise}
 */
const fetchSpeciesNameBySpeciesId = exports.fetchSpeciesNameBySpeciesId = species_id => {
  return new Promise(resolve => {
    fetchSpeciesNames()
      .then(data => {
        const records = data.filter(r => r.pokemon_species_id === species_id && r.local_language_id === LANG_EN)
        if (records) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      });
  });
};

 /**
  * Fetches the species flavor text (pokemon_species_flavor_text.csv)
  * @return {Promise}
  */
const fetchSpeciesFlavorText = exports.fetchSpeciesFlavorText = () => {
    const list = [];
    const file = path.resolve(__dirname, 'data', 'csv', 'pokemon_species_flavor_text.csv');
    return utils.loadCsv(file);
};

/**
 * Fetches the species flavor text by the species ID
 *
 * @param {Integer} speciesId
 * @return {Promise}
 */
const fetchSpeciesFlavorTextBySpeciesId = exports.fetchSpeciesFlavorTextBySpeciesId = species_id => {
  return new Promise(resolve => {
    fetchSpeciesFlavorText()
      .then(data => {
        const records = data.filter(r => r.species_id === species_id && r.language_id === LANG_EN && r.version_id === VERSION_ID);
        if (records) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      });
  });
};

 /**
  * Fetches the form (pokemon_forms.csv)
  * @return {Promise}
  */
const fetchForms = exports.fetchForms = () => {
    const list = [];
    const file = path.resolve(__dirname, 'data', 'csv', 'pokemon_forms.csv');
    return utils.loadCsv(file);
};

/**
 * Fetches the forms by the Pokemon identifier
 *
 * @param {String} pokemonId
 * @return {Promise}
 */
const fetchFormsByPokemonId = exports.fetchFormsByPokemonId = pokemonId => {
  return new Promise(resolve => {
    fetchForms()
      .then(data => {
        const records = data.filter(r => r.pokemon_id === pokemonId);
        if (records) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      });
  });
};


 /**
  * Fetches the form names (pokemon_form_names.csv)
  * @return {Promise}
  */
const fetchFormNames = exports.fetchFormNames = () => {
    const list = [];
    const file = path.resolve(__dirname, 'data', 'csv', 'pokemon_form_names.csv');
    return utils.loadCsv(file);
};

/**
 * Fetches the form names by the form ID
 *
 * @param {Integer} formId
 * @return {Promise}
 */
const fetchFormNamesByFormId = exports.fetchFormNamesByFormId = formId => {
  return new Promise(resolve => {
    fetchFormNames()
      .then(data => {
        const records = data.filter(r => r.pokemon_form_id === formId && r.local_language_id === LANG_EN);
        if (records) {
          resolve(records[0]);
        } else {
          resolve(null);
        }
      });
  });
};
