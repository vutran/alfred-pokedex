const path = require('path');
const alfy = require('alfy');
const base64 = require('node-base64-image');
const fs = require('fs-extra');
const endpoints = require('./endpoints');
const utils = require('./utils');

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
    alfy.fetch(endpoints.lookup(alfy.input))
      .then(data => {
        fs.mkdirp(utils.iconDir, err => {
          if (!err) {
            // download the image
            base64.encode(data.sprites.front_default, {}, (err, image) => {
              // write the image to disk
              fs.writeFile(utils.iconPath(data.id), image);
              const title = '#' + data.id + ': ' + utils.capitalize(data.name);
              // output items
              const items = [
                {
                  title: title,
                  subtitle: data.types.map(t => utils.capitalize(t.type.name)).join(', '),
                  arg: utils.getOpenUrl(data.name),
                  icon: {
                    path: utils.iconPath(data.id),
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
