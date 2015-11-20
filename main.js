dispatcher = require('edispatcher');

var component_map = {
  'example': require('./component/example/example.js')
};

document.addEventListener('DOMContentLoaded', function() {
  var components = document.querySelectorAll("[component]");
  for (var i = 0, l = components.length; i < l; i++) {
    var component = components[i];
    var component_name = component.getAttribute("component");
    var component_constructor = component_map[component_name];
    if (typeof component_constructor === "function") {
      new component_map[component_name](component);
    } else {
      console.warn('There is no constructor for component ' + component_name);
    }
  }
  dispatcher.send('components_loaded', null, 'main');
});
