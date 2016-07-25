/**
 * Lists all pokemon
 */
const all = exports.all = 'http://pokeapi.co/api/v2/pokemon/?limit=721';

/**
 * Returns the lookup endpoint
 *
 * @param {String} query
 * @return {String}
 */
const lookup = exports.lookup = query => `http://pokeapi.co/api/v2/pokemon/${query}`;
