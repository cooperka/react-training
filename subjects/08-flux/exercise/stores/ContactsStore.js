var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../AppDispatcher');
var ActionTypes = require('../Constants').ActionTypes;

var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
  contacts: [],
  deletingContacts: {}, // map of contact IDs
  errorMessages: {},
  loaded: false
};

function setState(newState) {
  assign(state, newState);
  events.emit(CHANGE_EVENT);
}

var ContactsStore = {
  addChangeListener: function (fn) {
    events.addListener(CHANGE_EVENT, fn);
  },

  removeChangeListener: function (fn) {
    events.removeListener(CHANGE_EVENT, fn);
  },

  getState: function () {
    return state;
  }
};

ContactsStore.dispatchToken = AppDispatcher.register(function (payload) {
  var { action } = payload;
  var { contact, error } = action;

  if (action.type === ActionTypes.CONTACTS_LOADED) {
    setState({
      loaded: true,
      contacts: action.contacts
    });
  }

  if (action.type === ActionTypes.DELETE_CONTACT) {
    state.deletingContacts[action.contact.id] = true;

    setState({
      deletingContacts: state.deletingContacts
    });
  }

  if (action.type === ActionTypes.DELETED_CONTACT) {
    state.deletingContacts[contact.id] = null;
    state.errorMessages[contact.id] = null;

    setState({
      contacts: state.contacts.filter(c => c.id !== contact.id),
      deletingContacts: state.deletingContacts,
      errorMessages: state.errorMessages
    });
  }

  if (action.type === ActionTypes.ERROR_DELETING_CONTACT) {
    state.deletingContacts[contact.id] = null;
    state.errorMessages[contact.id] = error.message;

    setState({
      deletingContacts: state.deletingContacts,
      errorMessages: state.errorMessages
    });
  }
});

module.exports = ContactsStore;
