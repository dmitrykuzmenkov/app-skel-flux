dispatcher = require('edispatcher');

document.addEventListener('DOMContentLoaded', function() {
  var components = document.querySelectorAll("[component]");
  for (var i = 0, l = components.length; i < l; i++) {
    var component = components[i];
    var component_name = component.getAttribute("component");
    try {
      var component_constructor = require('./component/' + component_name + '/' + component_name + '.js');
      new component_constructor(component);
    } catch (e) {
      console.warn('Failed to initialize component ' + component_name + '. ' + e);
    }
  }
  dispatcher.send('components_loaded', null, 'main');
});
