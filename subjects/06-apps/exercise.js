////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you.
//
// Already done?
//
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
//
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');
var { login, sendMessage, subscribeToMessages } = require('./utils/ChatUtils');

/*

Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a github
  // `auth` object
});

sendMessage(
  'general', // the channel to post a message to, please post to "general" at first
  'ryanflorence', // the github user name
  'https://avatars.githubusercontent.com/u/100200?v=3', // the github avatar
  'hello, this is a message' // the actual message
);

var unsubscribe = subscribeToMessages('general', (messages) => {
  // here are your messages as an array, it will be called
  // every time the messages change
});
unsubscribe(); // stop listening for changes

The world is your oyster!

*/

var { arrayOf, shape, string, number, func } = React.PropTypes;

var message = shape({
  avatar: string,
  text: string,
  timestamp: number,
  username: string,
  _key: string
});

var MessageList = React.createClass({

  propTypes: {
    messages: arrayOf(message)
  },

  render() {
    var { messages } = this.props;

    messages.sort(sortBy('timestamp'));

    var items = messages.map((message) => {
      return (
        <li>
          <span style={{ minWidth: 100 }}>{message.username}: </span>
          <span>{message.text}</span>
        </li>
      );
    });

    return <ol>{items}</ol>;
  }

});

var MessageInput = React.createClass({

  propTypes: {
    onNewMessage: func
  },

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      var input = event.target;
      var messageText = input.value;

      input.value = '';

      if (this.props.onNewMessage) {
        this.props.onNewMessage(messageText);
      }
    }
  },

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleKeyUp} />
      </div>
    )
  }

});

var ChatApp = React.createClass({

  getInitialState() {
    return {
      auth: null,
      messages: []
    };
  },

  componentDidMount() {
    login((error, auth) => {
      console.log(auth.github.username);
      this.setState({ auth });

      subscribeToMessages('general', (messages) => {
        this.setState({ messages });
      })
    });
  },

  handleNewMessage(messageText) {
    var { auth } = this.state;
    var username = auth.github.username;
    var avatar = auth.github.profileImageURL;

    sendMessage('general', username, avatar, messageText);
  },

  render() {
    var debug = false;
    var { auth, messages } = this.state;

    if (auth == null) return <p>Loading...</p>;

    if (debug) return <pre>Test</pre>

    return (
      <div>
        <div>Hello {auth.github.username}! You have {messages.length} new messages.</div>
        <div>
          <MessageList messages={messages} />
          <MessageInput onNewMessage={this.handleNewMessage} />
        </div>
      </div>
    );
  }

});

React.render(<ChatApp />, document.getElementById('app'));
