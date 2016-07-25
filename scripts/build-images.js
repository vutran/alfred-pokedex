const path = require('path');
const fs = require('fs-extra');
const base64 = require('node-base64-image');
const api = require('../api');
const utils = require('../utils');

/**
 * Return the remote sprite image URL
 *
 * @param {Integer} id
 * @return {String}
 */
const getImageUrl = exports.getImage = id => `http://pokeapi.co/media/sprites/pokemon/${id.toString()}.png`;

/**
 * Fetches and caches the image locally
 *
 * @param {Integer} id
 * @return {Promise}
 */
const fetchImage = exports.fetchImage = id => {
  const url = getImageUrl(id);
  return new Promise(resolve => {
    fs.mkdirp(utils.SPRITES_DIR, err => {
      if (!err) {
        // download the image
        base64.encode(url, {}, (err2, image) => {
          // write the image to disk
          fs.writeFile(utils.getSpritesPath(id), image, null, () => {
            resolve(true);
          });
        });
      }
    });
  });
};

/**
 * Builds the Pokemon images
 *
 * @return {Promise}
 */
const buildImages = () => {
  return new Promise(resolve => {
    const fileDir = path.resolve(__dirname, '..', 'data', 'sprites');
    const filePath = path.resolve(fileDir, 'pokemons.json');
    api.fetchAll()
      .then(pokemons => {
        if (pokemons) {
          pokemons.forEach(pokemon => {
            fetchImage(pokemon.id);
          });
        }
      });
  });
};

buildImages();
