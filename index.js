/**
 * Module Dependencies
 */

var Regexp = require('path-to-regexp')
var assign = require('object-assign')
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
  var routing = buildRoutes(routes)
  return function route (req, res) {
    var url = URL.parse(req.url, true)
    var pathname = url.pathname
    var params = {}

    // routes specific to next.js
    if (pathname === '/__webpack_hmr') return handler(req, res)
    if (pathname.slice(0, 10) === '/_webpack/') return handler(req, res)
    if (pathname.slice(0, 7) === '/_next/') return handler(req, res)

    // perform the routing
    for (var route in routes) {
      var m = match(route, params, pathname)
      if (m) {
        var r = routing[route]
        var query = assign(params, r.query || {}, url.query)
        return app.render(req, res, r.pathname, query)
      }
    }

    // pass the rest of the requests through next's handler
    handler(req, res)
  }
}

/**
 * Build routes
 */

function buildRoutes (routes) {
  var routing = {}
  for (var route in routes) {
    routing[route] = URL.parse(routes[route], true)
  }
  return routing
}

/**
 * Check if this route matches `path`, if so
 * populate `params`.
 *
 * @param {String} path
 * @param {Object} params
 * @return {Boolean}
 * @api private
 */

function match (path, params, pathname) {
  var keys = []
  var regexp = Regexp(path, keys)
  var m = regexp.exec(pathname)

  if (!m) return false
  else if (!params) return true

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1]
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) params[key.name] = val
  }

  return true
}
