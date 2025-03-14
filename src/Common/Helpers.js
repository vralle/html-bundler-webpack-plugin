const path = require('path');
const { parseRequest } = require('./RequestParser');

const isWin = path.sep === '\\';

/**
 * Converts the win path to the POSIX standard.
 * The require() function understands only the POSIX format.
 *
 * Fix path, for example:
 *   - `..\\some\\path\\file.js` to `../some/path/file.js`
 *   - `C:\\some\\path\\file.js` to `C:/some/path/file.js`
 *
 * @param {string} value A path string.
 * @return {string}
 */
const pathToPosix = (value) => value.replace(/\\/g, '/');

const isFunction = (value) => typeof value === 'function';

/**
 * Whether the request is a URL.
 *
 * Matches:
 *  - https://example.com/img.png
 *  - http://example.com/img.png
 *  - ftp://example.com/img.png
 *  - whatsapp://send?abid=1234567890&text=Hello
 *  - something://example.com/img.png
 *  - //img.png
 *
 * But not matches:
 *  - /img.png
 *
 * @param {string} request
 * @return {boolean}
 */
const isUrl = (request) => /^(?:[a-z]+:)?\/\//.test(request);

/**
 * Join a base URL with multiple sub-paths, ensuring correct formatting (removes extra slashes).
 *
 * Example:
 *   joinUrl('https://cdn.com/v1/', '/path/', '/to/') => 'https://cdn.com/v1/path/to'
 *
 * @param {...string} paths - The base URL and any number of sub-paths to join.
 * @return {string} The joined URL.
 */
const joinUrl = (...paths) => {
  let result = paths[0].replace(/\/+$/, '');
  let tail = '';

  if (paths.length > 1) {
    tail = paths
      .slice(1) // skip the first part since it's already handled
      .filter(Boolean) // remove empty strings from the paths
      .map((p) => p.replace(/^\/+|\/+$/g, '')) // remove leading/trailing slashes from other parts
      .join('/');
  }

  if (tail) {
    result += '/' + tail;
  }

  return result;
};

/**
 * Find a webpack plugin by instance name.
 *
 * @param {Array<Object>} plugins The webpack compiler.options.plugins.
 * @param {string} name The class name of the plugin.
 * @return {Object|null}
 */
const findPlugin = (plugins, name) => plugins.find((item) => item.constructor.name === name);

/**
 * Output to console.
 *
 * @param {*} args
 * @return {boolean}
 */
const outToConsole = (...args) => process.stdout.write(args.join(' ') + '\n');

/**
 * Returns a file extension without leading '.'.
 *
 * Note: this implementation fixes many issues of node path.parse().
 *
 * @param {string} resource The resource file, including a query.
 * @param {boolean} win Whether the path is in windows format. This parameter is autodetect.
 *  It is used for unit testing only.
 * @return {string}
 */
const getFileExtension = (resource, win = isWin) => {
  let [file] = resource.split('?', 1);
  if (win) file = pathToPosix(file);
  const { ext } = path.parse(file);

  return ext === '' ? '' : ext.slice(1);
};

/**
 * Whether the request contains the query parameter.
 *
 * @param {string} request
 * @param {string} name
 * @return {boolean}
 */
const hasQueryParam = (request, name) => {
  const [, query] = request.split('?', 2);
  const urlParams = new URLSearchParams(query);

  return urlParams.get(name) != null;
};

/**
 * Get the query parameter from the request.
 *
 * @param {string} request
 * @param {string} name
 * @return {string|null}
 */
const getQueryParam = (request, name) => {
  const [, query] = request.split('?', 2);
  const urlParams = new URLSearchParams(query);

  return urlParams.get(name);
};

/**
 * Get all query parameters from the request.
 *
 * @param {string} request
 * @return {URLSearchParams|null}
 */
const getQueryParams = (request) => {
  const queryString = request.split('?')[1];
  if (!queryString) return null;

  return new URLSearchParams(queryString);
};

/**
 * Add to the request a query parameter.
 *
 * @param {string} request
 * @param {string} name
 * @param {*} value
 * @return {string}
 */
const addQueryParam = (request, name, value) => {
  const [file, query] = request.split('?', 2);
  const urlParams = new URLSearchParams(query);

  urlParams.append(name, value);

  return file + '?' + urlParams.toString();
};

/**
 * Split an URL to two parts, keeping ? or # in the second part.
 *
 * @param {string} url
 * @return {[string, string]}
 */
const splitUrl = (url) => {
  const match = url.match(/[\?#]/);

  if (!match) return [url, ''];

  const index = match.index;

  return [url.slice(0, index), url.slice(index)];
};

/**
 * Delete form the request a query parameter.
 *
 * @param {string} request
 * @param {string} name
 * @return {string}
 */
const deleteQueryParam = (request, name) => {
  const [file, query] = request.split('?', 2);
  const urlParams = new URLSearchParams(query);

  urlParams.delete(name);

  const newQuery = urlParams.toString();

  return newQuery ? file + '?' + newQuery : file;
};

/**
 * Get valid url with parameters.
 *
 * If request has the query w/o value, e.g. `?param`,
 * then Webpack generates the `resource` path with `=` at the end, e.g. `?param=`,
 * that brake the workflow the plugin!
 *
 * @param {string} request
 * @return {string}
 */
const getFixedUrlWithParams = (request) => {
  if (request.endsWith('=')) {
    request = request.slice(0, -1);
  }

  return request;
};

/**
 * Merge two objects.
 * @param {Object} a
 * @param {Object} b
 * @return {{}}
 */
const deepMerge = (a, b) => {
  const result = {};
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue?.constructor === Object && bValue?.constructor === Object) {
      result[key] = deepMerge(aValue, bValue);
    } else if (typeof bValue === 'function') {
      // keep functions as-is
      result[key] = bValue;
    } else {
      try {
        result[key] = structuredClone(bValue !== undefined ? bValue : aValue);
      } catch (err) {
        console.warn(`Skipping cloning for key "${key}" due to:`, err);
        // use original reference
        result[key] = bValue !== undefined ? bValue : aValue;
      }
    }
  }
  return result;
};

/**
 * Whether at least one regular expression in a giving array matches the value.
 *
 * @param {string} value
 * @param {Array<RegExp>} expressions
 * @return {boolean}
 */
const testRegExpArray = (value, expressions) => {
  if (value == null) return false;

  // if is an URL, get it w/o a query
  const [file] = value.split(/[\?#]/, 1);

  return expressions.some((regexp) => regexp.test(file));
};

/**
 * Returns an indent detected in the content.
 *
 * @param {string} content The template content.
 * @param {number} startPos The start position of a tag. An indent will be detected before the tag position.
 * @return {string}
 */
const detectIndent = (content, startPos) => {
  const idents = [' ', '\t'];
  let pos = startPos;

  while (idents.indexOf(content.charAt(pos)) > -1 && pos > 0) pos--;

  return pos < startPos ? content.slice(pos + 1, startPos + 1) : '';
};

/**
 * Parse version string including leading compare chars.
 * For example: '=5.96.1', '>5.96.1', '< 5.96.1', '<= 5.96.1', >= 5.96.1'
 *
 * @param version
 * @return {[compare: string, version: string]}
 */
const parseVersion = (version) => {
  let i;
  for (i = 0; i < version.length; i++) {
    let char = version.codePointAt(i);
    if (char >= 48 && char <= 57) {
      break;
    }
  }
  let compare = version.slice(0, i);
  compare = compare.trim();

  return [compare, version.slice(i)];
};

/**
 * Compare two semantic versions.
 *
 * @param {string} version1
 * @param {string} compare One of: `=`, `<`, `>`, `<=`, `>=`
 * @param {string} version2
 * @return {boolean}
 */
const compareVersions = (version1, compare, version2) => {
  const sortVersions = (x, v = (s) => s.match(/[a-z]|\d+/g).map((c) => (c == ~~c ? String.fromCharCode(97 + c) : c))) =>
    x.sort((a, b) => ((a + b).match(/[a-z]/) ? (v(b) < v(a) ? 1 : -1) : a.localeCompare(b, 0, { numeric: true })));

  const versions = [version1, version2];
  const sorted = sortVersions(versions);
  let result;

  if (version1 === version2) {
    result = 0;
  } else if (sorted[0] === version1) {
    result = -1;
  } else {
    result = 1;
  }

  switch (compare) {
    case '=':
      return result === 0;
    case '<':
      return result === -1;
    case '>':
      return result === 1;
    case '<=':
      return result === 0 || result === -1;
    case '>=':
      return result === 0 || result === 1;
  }

  return false;
};

module.exports = {
  isWin,
  isFunction,
  isUrl,
  joinUrl,
  findPlugin,
  pathToPosix,
  getFileExtension,
  parseQuery: (request) => parseRequest(request).query,
  hasQueryParam,
  getQueryParam,
  getQueryParams,
  addQueryParam,
  splitUrl,
  deleteQueryParam,
  getFixedUrlWithParams,
  deepMerge,
  detectIndent,
  testRegExpArray,
  outToConsole,
  parseVersion,
  compareVersions,
};
