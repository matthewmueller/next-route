var NextLink = require('next/link').default
var assign = require('object-assign')
var Resolve = require('./resolve')
var React = require('react')
var URL = require('url')

/**
 * App package
 */

var pkg = require('./package.json')
var resolve = Resolve(pkg && pkg.routes)

/**
 * Link
 */

module.exports = function Link (props) {
  if (!props.href || props.as) return React.createElement(NextLink, props)
  var url = resolve(props.href)
  if (!url) return React.createElement(NextLink, props)
  var p = assign({}, props, { href: URL.format(url), as: props.href })
  return React.createElement(NextLink, p)
}
