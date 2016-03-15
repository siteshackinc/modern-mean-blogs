(function() {
  'use strict';

  angular
    .module('blogs')
    .run(menuConfig);

  menuConfig.$inject = ['$state', 'menuFactory', 'Authentication', '$rootScope', 'AUTH_EVENTS'];

  function menuConfig($state, menuFactory, Authentication, $rootScope, AUTH_EVENTS) {
    menuFactory.sidenavleft.addItem({
      id: 'menublog',
      title: '',
      icon: '',
      type: 'menu',
      aria: 'Blog Menu',
      show: true,
      items: [{
        title: 'blogs',
        icon: 'library_books',
        state: 'root.blogs.list'
      }]
    });
  }
})();
