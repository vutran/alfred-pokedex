const path = require('path');
const alfy = require('alfy');
const base64 = require('node-base64-image');
const fuzzy = require('fuzzy');
const fs = require('fs-extra');
const api = require('./api');
const endpoints = require('./endpoints');
const utils = require('./utils');

/**
 * Makes a new request to the API for data
 *
 * @param {String} input
 * @return {Promise}
 */
const makeRequest = input => {
  return new Promise(resolve => {
    api.lookup(input)
      .then(data => {
        fs.mkdirp(utils.iconDir, err => {
          if (!err) {
            // download the image
            base64.encode(data.sprites.front_default, {}, (err, image) => {
              // write the image to disk
              fs.writeFile(utils.iconPath(data.id), image);
              const title = utils.capitalize(data.name);
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
              resolve([input, items]);
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

// pre-pop
const listKey = 'pokemon.list';
const results = alfy.cache.get(listKey);
if (!results) {
  api.fetchAll()
    .then(data => {
      if (data && data.results) {
        alfy.cache.set(listKey, data.results);
      }
    });
}

const fuzzyOptions = { extract: el => el.name };
const matches = fuzzy.filter(alfy.input, results, fuzzyOptions);

// lookup all matches
if (matches.length) {
  const itemsPromises = [];
  matches.forEach(record => {
    // lookup from cache
    const results = alfy.cache.get(`lookup.pokemon.${record.string}`);
    if (!results) {
      // if not avail, make a new request
      itemsPromises.push(makeRequest(record.string));
    } else {
      itemsPromises.push(Promise.resolve([record.string, results]));
    }
  });
  Promise.all(itemsPromises)
    .then(values => {
      if (values) {
        let items = [];
        values.forEach(valuesObj => {
          // cache data
          valuesObj[1].forEach(item => {
            alfy.cache.set(`lookup.pokemon.${valuesObj[0]}`, [item]);
          });
          // concat items
          items = items.concat(valuesObj[1]);
        });
        // cache all items
        if (items) {
          alfy.output(items);
        }
      }
    });
}
