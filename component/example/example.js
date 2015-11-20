require('./example.less');

var dispatcher = require('edispatcher');
var delegate = require('domd');
var jext = require('jext');
var template = require('./example.jext');

var pool = jext.pool(template);

dispatcher.on('components_loaded', function (event) {
  console.log('Components loaded!');
});

var rows = [
  {index: 1, value: 'one'},
  {index: 2, value: 'two'},
  {index: 3, value: 'three'}
];

module.exports = function(element) {
  console.log('Hello from example');
  console.log(element);

  var obj = pool.get('example');
  element.appendChild(obj.dom());
  obj.set('text', 'Hello from JEXT!');
  obj.update({
    condition: true,
    rows: rows,
    realtime: '^write something^'
  });

  var input_el = element.querySelector('.js-input');
  var d = delegate(element);

  d.on('click', '.js-click', function(ev, el) {
    alert('You clicked it!');
    console.log('clicked', ev, el);
  });

  d.on('click', '.js-add-button', function(ev, el) {
    rows.push({index: rows.length > 0 ? rows[rows.length - 1].index + 1 : 1, value: input_el.value});
    input_el.value = '';
    obj.set('rows', rows);
  });

  d.on('click', '.js-remove-button', function(ev, el) {
    var remove_index = parseInt(el.getAttribute('data-index'), 10);
    rows = rows.filter(function(v) {
      return v.index != remove_index;
    });
    obj.set('rows', rows);
  });

  d.on('keyup', '.js-input-realtime', function(ev, el) {
    obj.set('realtime', el.value);
  });


  d.on('click', '.js-event2', function(ev, el){
    console.log('event2');
  });

  d.on('click', '.js-event1', function(ev, el){
    console.log('event1');
  });

  d.on('click', '.js-event3', function(ev, el){
    ev.preventDefault();
    console.log('event3');
  });
};
