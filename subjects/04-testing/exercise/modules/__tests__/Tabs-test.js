var assert = require('assert');
var React = require('react/addons');
var { click } = React.addons.TestUtils.Simulate;
var Tabs = require('../Tabs');

describe('when <Tabs> is rendered', function () {
  var fixtureData = [
    { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
    { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
    { id: 3, name: 'Russia', description: 'World Cup 2018!' },
  ];

  var node, html, tabs, panel, borderFixture;
  beforeEach(function (done) {
    var component = React.render(<Tabs data={fixtureData}/>, document.body, function () {
      node = React.findDOMNode(this);
      html = node.innerHTML;
      tabs = node.querySelectorAll('.Tab');
      panel = node.querySelector('.TabPanel');

      borderFixture = document.createElement('div');
      borderFixture.setAttribute('style', 'border-bottom-color: #000;');

      done();
    });
  });

  afterEach(function () {
    React.unmountComponentAtNode(document.body);
  });

  it('renders the USA tab', function() {
    assert(html.match(/USA/), 'render the USA tab');
  });

  it('renders the Brazil tab', function() {
    assert(html.match(/Brazil/), 'render the Brazil tab');
  });

  it('renders the Russia tab', function() {
    assert(html.match(/Russia/), 'render the Russia tab');
  });

  it('activates the first tab', function() {
    tabs[0].style.borderBottomColor !== borderFixture.style.borderBottomColor,
    'first tab is inactive'
  });

  it('does not activate the second tab', function() {
    tabs[1].style.borderBottomColor === borderFixture.style.borderBottomColor,
    'second tab is active'
  });

  describe('after clicking the third tab', function () {
    beforeEach(function () {
      click(tabs[2]);
    });

    it('activates the third tab', function() {
      tabs[2].style.borderBottomColor !== borderFixture.style.borderBottomColor,
      'third tab is inactive'
    });

    it('deactivates the first tab', function() {
      tabs[0].style.borderBottomColor === borderFixture.style.borderBottomColor,
      'first tab is active'
    });

    it('puts the correct content in the panel', function() {
      assert(
        panel.textContent.trim() == 'World Cup 2018!',
        'you have the wrong content in the panel'
      );
    });
  });
});
