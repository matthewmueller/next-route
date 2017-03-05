/**
 * Module Dependencies
 */

var Regexp = require('path-to-regexp')
var assign = require('object-assign')
var Resolve = require('./resolve')
var path = require('path')
var URL = require('url')

/**
 * Export `Route`
 */

module.exports = Route

/**
 * App package
 */

var pkg = path.join(process.cwd(), 'package.json')

/**
 * Create `Route`
 *
 * @param {Next App} app
 * @param {Object} routes (optional)
 * @return {Function}
 */

function Route (app, routes) {
  routes = routes || require(pkg).routes || {}
  var handler = app.getRequestHandler()
  var resolve = Resolve(routes)
  return function route (req, res) {
    var url = URL.parse(req.url, true)
    var pathname = url.pathname

    // routes specific to next.js
    if (pathname === '/__webpack_hmr') return handler(req, res)
    if (pathname.slice(0, 10) === '/_webpack/') return handler(req, res)
    if (pathname.slice(0, 7) === '/_next/') return handler(req, res)

    var u = resolve(req.url)
    if (!u) return handler(req, res)
    console.log('rendering', u.pathname, u.query)
    return app.render(req, res, u.pathname, u.query)
  }
}
