////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
// - try this again without JSX
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `React.render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' },
    { id: 5, name: 'catfish', type: 'southern' }
  ]
};

var filterType = 'mexican';
var sortAsc = true;

function changeFilter(event) {
  filterType = event.target.value;
  updateThePage();
}

function toggleSort() {
  sortAsc = !sortAsc;
  updateThePage();
}

function render() {
  var filteredItems = DATA.items.filter((item) => (item.type === filterType));
  var sortedItems = filteredItems.sort(sortBy(sortAsc ? 'name' : '-name'));
  var listItems = sortedItems.map((item) => (
    <li>{item.name}</li>
  ));

  var uniqueTypes = DATA.items.filter((item, index) => (true)); // TODO filter
  var selectItems = uniqueTypes.map((item) => (
    <option>{item.type}</option>
  ));

  return (
    <div>
      <h1>{DATA.title}</h1>
      <select onChange={changeFilter}>
        {selectItems}
      </select>
      <button onClick={toggleSort}>
        Sort {sortAsc ? "^" : "v"}
      </button>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

function updateThePage() {
  React.render(render(), document.getElementById('app'), function () {
    require('./tests').run(this);
  });
}

updateThePage();
