const path = require('path');
const fs = require('fs-extra');
const api = require('../api');

/**
 * Builds the Pokemon list
 *
 * @return {Promise}
 */
const buildList = () => {
  return new Promise(resolve => {
    const fileDir = path.resolve(__dirname, '..', 'data', 'json');
    const filePath = path.resolve(fileDir, 'pokemons.json');
    api.fetchAll()
      .then(pokemons => {
        fs.writeFile(filePath, JSON.stringify(pokemons), () => {
          resolve(filePath);
        });
      });
  });
};

buildList();
