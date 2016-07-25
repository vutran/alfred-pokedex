/**
 * Capitalizes each word in the string
 *
 * @param {String}
 * @return {String}
 */
exports.capitalize = str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();

/**
 * Returns the official Pokemon.com URL
 *
 * @param {String} name
 * @return {String}
 */
exports.getOpenUrl = name => `http://www.pokemon.com/us/pokedex/${name}`;
