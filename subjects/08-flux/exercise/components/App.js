var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState: function () {
    return ContactsStore.getState();
  },

  handleChange: function () {
    this.setState(ContactsStore.getState());
  },

  deleteContact: function (contact) {
    ViewActionCreators.deleteContact(contact);
  },

  componentDidMount: function () {
    ContactsStore.addChangeListener(this.handleChange);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount: function () {
    ContactsStore.removeChangeListener(this.handleChange);
  },

  renderContacts: function () {
    return this.state.contacts.map((contact) => {
      var isDeleting = this.state.deletingContacts[contact.id] === true;
      var errorMessage = this.state.errorMessages[contact.id];

      return (
        <li key={contact.first+contact.last} style={errorMessage ? { background: 'red' } : {}}>
          <img src={contact.avatar} width={40} />{' '}
          {contact.first} {contact.last}
          <button disabled={isDeleting} onClick={() => this.deleteContact(contact)}>x</button>
        </li>
      );
    });
  },

  render: function () {
    if (!this.state.loaded)
      return <div>Loading...</div>;

    return (
      <div>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  }
});

module.exports = App;
