(function(window, angular) {
  'use strict';

  window.modernMeanApplication.registerModule('blogs', ['core', 'users']);
  window.modernMeanApplication.registerModule('blogs.factory');
  window.modernMeanApplication.registerModule('blogs.admin', ['core.admin', 'users.admin']);
  window.modernMeanApplication.registerModule('blogs.routes', ['core.routes', 'blogs.factory']);

})(window, angular);
