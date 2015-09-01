////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render the data as tabs, with their `name` as the label in the tab
//   and their `description` inside the tab panel
// - Make it so that you can click a tab label and the panel renders
//   the correct content
// - Make sure the active tab has the active styles
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var { arrayOf, shape, number, string } = React.PropTypes;

var country = shape({
  id: number.isRequired,
  name: string,
  description: string.isRequired
});

var tab = shape({
  label: string.isRequired,
  content: string.isRequired
});

var DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
];

var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
};

styles.panel = {
  padding: 10
};

var Tabs = React.createClass({

  propTypes: {
    data: arrayOf(tab)
  },

  getInitialState() {
    return {
      activeTabIndex: 0
    };
  },

  handleClick(index) {
    this.setState({
      activeTabIndex: index
    })
  },

  render () {
    var tabDivs = this.props.data.map((tab, index) => {
      var isActive = index === this.state.activeTabIndex;
      return (
        <div
          className="Tab"
          key={index}
          style={isActive ? styles.activeTab : styles.tab}
          onClick={() => this.handleClick(index)}
        >
          {tab.label}
        </div>
        );
    });

    return (
      <div className="Tabs">
        {tabDivs}
        <div className="TabPanels" style={styles.panel}>
          {this.props.data[this.state.activeTabIndex].content}
        </div>
      </div>
    );
  }

});

var App = React.createClass({

  propTypes: {
    countries: arrayOf(country)
  },

  render () {
    var tabData = this.props.countries.map((country) => {
      return { label: country.name, content: country.description };
    });

    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={tabData}/>
      </div>
    );
  }

});

React.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this);
});
