const alfy = require('alfy');
const endpoints = require('./endpoints');

/**
 * Fetches all Pokemon
 *
 * @return {Promise}
 */
const fetchAll = exports.fetchAll = () => alfy.fetch(endpoints.all);

/**
 * Looks up a single Pokemon by ID or name
 *
 * @param {Integer|String} idOrName
 * @return {Promise}
 */
const lookup = exports.lookup = idOrName => alfy.fetch(endpoints.lookup(idOrName));
