(function () {
  'use strict';

  angular
    .module('blogs.factory')
    .factory('BlogsFactory', BlogsFactory);

  BlogsFactory.$inject = ['$resource'];

  function BlogsFactory($resource) {
    return $resource('/api/blogs/:blogId', {
      blogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
