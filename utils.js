const path = require('path');
const fs = require('fs-extra');
const base64 = require('node-base64-image');
const csv2json = require('csvtojson');
const fuzzy = require('fuzzy');

/**
 * @var {String} - The icon directory name
 */
const SPRITES_DIR = exports.SPRITES_DIR = path.resolve(__dirname, 'data', 'sprites');

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
 * @param {Integer|String} id
 * @return {String}
 */
const getOpenUrl = exports.getOpenUrl = id => `http://www.swecune.com/pokemon/${id.toString()}`;

/**
 * @param {Integer|String} - The pokemon ID
 * @return {String} - The sprites file path
 */
const getSpritesPath = exports.getSpritesPath = id => path.resolve(SPRITES_DIR, id.toString() + '.png');

/**
 * Loads the CSV and returns a Promise with the JSON data
 *
 * @param {String} file
 * @return {Promise}
 */
const loadCsv = exports.loadCsv = file => {
  return new Promise((resolve, reject) => {
    const converter = new csv2json.Converter();
    converter.fromFile(file, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Does a fuzzy match of the input against the given data
 *
 * @param {String} input
 * @param {Object[]} data
 */
const fetchMatching = exports.fetchMatching = (input, data) => {
  const fuzzyOptions = { extract: el => el.identifier };
  return fuzzy.filter(input, data, fuzzyOptions);
};
