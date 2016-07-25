const path = require('path');

/**
 * @var {String} - The icon directory name
 */
const iconDir = exports.iconDir = path.resolve(__dirname, 'imageCache');

/**
 * Capitalizes each word in the string
 *
 * @param {String}
 * @return {String}
 */
const capitalize = exports.capitalize = str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();

/**
 * Returns the official Pokemon.com URL
 *
 * @param {String} name
 * @return {String}
 */
const getOpenUrl = exports.getOpenUrl = name => `http://www.pokemon.com/us/pokedex/${name}`;

/**
 * @param {Integer|String} - The pokemon ID
 * @return {String} - The cached image file path
 */
const iconPath = exports.iconPath = id => path.resolve(iconDir, id.toString() + '.png');
