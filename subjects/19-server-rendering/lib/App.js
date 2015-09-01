var React = require('react');
var axios = require('axios');

var App = React.createClass({
  render() {
    var whereAmI = typeof window !== 'undefined' ? 'client' : 'server';

    // The "whereAmI" logging changes on the client forcing a reload;
    // if you remove it, it will show "HACKED" (from ./exercise.js).
    return (
      <div>
        <h1>¡Universal App!</h1>
        <p>{whereAmI}</p>
        <ul>
          {this.props.contacts.map(contact => (
            <li key={contact.id}>{contact.first} {contact.last}</li>
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = App;

