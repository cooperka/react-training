////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// First, complete the work in `server.js` then come back here.
//
// Render `App` into the `app` element from the server, with the contacts
// the server rendered in the `<script/>`.
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var App = require('./lib/App');

document.querySelector('h1').innerHTML = 'HACKED!'; // TODO not working

React.render(<App contacts={__DATA__} />, document.getElementById('app'));
