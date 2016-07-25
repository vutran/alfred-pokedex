/**
 * Lists all pokemon
 */
exports.all = 'http://pokeapi.co/api/v2/pokemon/?limit=9999';

/**
 * Returns the lookup endpoint
 *
 * @param {String} query
 * @return {String}
 */
exports.lookup = query => `http://pokeapi.co/api/v2/pokemon/${query}`;
