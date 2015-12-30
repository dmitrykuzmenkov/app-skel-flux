var dispatcher = require('edispatcher');
var components = require('./config/component.config.js');

document.addEventListener('DOMContentLoaded', function() {
  components.forEach(function (component) {
    try {
      var cc = require('./component/' + component + '/' + component + '.js');
      new cc(document.body);
    } catch (e) {
      console.warn('Failed to initialize component ' + component + '. ' + e);
    }
  });
  dispatcher.send('components_loaded', null, 'main');
});
