(function() {
  'use strict';

  angular
    .module('blogs.admin')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuFactory', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuFactory, Authentication, $rootScope, AUTH_EVENTS) {

  }

})();
