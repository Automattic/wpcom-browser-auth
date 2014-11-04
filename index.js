
/**
 * Module dependencies.
 */

var parse = require('url').parse;
var format = require('url').format;
var querystring = require('querystring');

var authorizeEndpoint = parse('https://public-api.wordpress.com/oauth2/authorize');

/**
 * Module exports.
 */

exports.url = url;
exports.redirect = redirect;
exports.response = response;

/**
 * Returns the URL to do the client-side OAuth authentication.
 *
 * @param {String} client_id - WordPress.com application `client_id`
 * @param {Object} [options] - optional Options object
 * @return {String} URL for WordPress.com client-side OAuth.
 * @public
 */

function url (client_id, opts) {
  if (client_id && 'string' !== typeof client_id) {
    opts = client_id;
    client_id = opts.client_id;
  }
  if (!client_id) throw new Error('a `client_id` must be provided');

  var i;
  var u = {};
  for (i in authorizeEndpoint) u[i] = authorizeEndpoint[i];
  for (i in opts) u[i] = opts[i];

  var query = u.query = {};
  for (i in opts) query[i] = opts[i];
  query.client_id = client_id;
  if (!query.response_type) query.response_type = 'token';
  if (!query.redirect_uri) query.redirect_uri = global.location.href.replace(/\#.*$/, '');

  return format(u);
}

/**
 * Redirects the current page to the WordPress.com OAuth page,
 * using the given `client_id` and options.
 *
 * @param {String} client_id - WordPress.com application `client_id`
 * @param {Object} [options] - optional Options object
 * @public
 */

function redirect (client_id, opts) {
  global.location = exports.url(client_id, opts);
}

/**
 * Returns the formatted token parsed as an Object.
 *
 * It contains an `access_token` which is the API token to be
 * used for client-side API calls.
 *
 * @public
 */

function response (url) {
  if (!url) url = global.location.href;

  var hash;
  var parsed = parse(url, true);

  if (parsed.hash && parsed.hash.length > 1) {
    hash = querystring.parse(parsed.hash.substring(1));
  }

  return hash;
}
