var Router = require('next/router').default
var Resolve = require('./resolve')
var URL = require('url')

/**
 * App package
 */

var pkg = require('./package.json')
var resolve = Resolve(pkg && pkg.routes)

/**
 * Export `push`
 */

exports.push = function (href, as) {
  if (!href || as) return Router.push(href, as)
  var url = resolve(href)
  if (!url) return Router.push(href, as)
  return Router.push(URL.format(url), href)
}

/**
 * Export `replace`
 */

Router.replace = function (href, as) {
  if (!href || as) return Router.replace(href, as)
  var url = resolve(href)
  if (!url) return Router.replace(href, as)
  return Router.replace(URL.format(url), href)
}
