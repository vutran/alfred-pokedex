const path = require('path');
const alfy = require('alfy');
const base64 = require('node-base64-image');
const fs = require('fs-extra');

/**
 * Capitalizes each word in the string
 *
 * @param {String}
 * @return {String}
 */
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

/**
 * Returns the lookup endpoint
 *
 * @param {String} query
 * @return {String}
 */
const lookup = query => `http://pokeapi.co/api/v2/pokemon/${query}`;

/**
 * Returns the official Pokemon.com URL
 *
 * @param {String} name
 * @return {String}
 */
const openUrl = name => `http://www.pokemon.com/us/pokedex/${name}`;

/**
 * @var {String} - The icon directory name
 */
const iconDir = path.resolve(__dirname, 'imageCache');

/**
 * @param {Integer|String} - The pokemon ID
 * @return {String} - The cached image file path
 */
const iconPath = id => path.resolve(iconDir, id.toString() + '.png');

// from cache
const results = alfy.cache.get(alfy.input);

/**
 * Makes a new request to the API for data
 *
 * @param {String} input
 * @return {Promise}
 */
const makeRequest = input => {
  return new Promise(resolve => {
    alfy.fetch(lookup(alfy.input))
      .then(data => {
        fs.mkdirp(iconDir, err => {
          if (!err) {
            // download the image
            base64.encode(data.sprites.front_default, {}, (err, image) => {
              // write the image to disk
              fs.writeFile(iconPath(data.id), image);
              const title = '#' + data.id + ': ' + capitalize(data.name);
              // output items
              const items = [
                {
                  title: title,
                  subtitle: data.types.map(t => capitalize(t.type.name)).join(', '),
                  arg: openUrl(data.name),
                  icon: {
                    path: iconPath(data.id),
                  }
                },
              ];
              alfy.output(items);
              resolve(items);
            });
          }
        });
      })
      .catch(err => {
        console.log(JSON.stringify({
          items: [{
            title: err.name,
            subtitle: err.message,
            valid: false,
            text: {
              copy: err.stack
            }
          }]
        }));
      });
  });
}

if (!results) {
  makeRequest(alfy.input)
    .then(res => {
      alfy.cache.set(alfy.input, res);
    });
} else {
  alfy.output(results);
}
