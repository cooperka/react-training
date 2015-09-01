var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
  loadedContacts: function (contacts) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CONTACTS_LOADED,
      contacts: contacts
    });
  },

  deletedContact: function (contact) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.DELETED_CONTACT,
      contact: contact
    });
  },

  errorDeletingContact: function (contact, error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ERROR_DELETING_CONTACT,
      contact: contact,
      error: error
    })
  }
};

module.exports = ServerActionCreators;
