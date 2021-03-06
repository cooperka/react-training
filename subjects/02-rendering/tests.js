var React = require('react');
var assert = require('../assert');

exports.run = (component) => {
  var node = React.findDOMNode(component);
  var html = node.innerHTML;

  assert(!!html.match(/burrito/), 'render burrito');
  assert(!!html.match(/tacos/), 'render tacos');
  assert(!!html.match(/tostada/), 'render tostada');
  assert(!html.match(/hush puppies/), 'filter out hush puppies');
  assert(html.indexOf('burrito') < html.indexOf('tacos'), 'burrito rendered first');
  assert(html.indexOf('tacos') < html.indexOf('tostada'), 'tacos rendered second');
};
