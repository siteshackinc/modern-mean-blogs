(function() {
  'use strict';

  angular
    .module('blogs')
    .controller('BlogsController', BlogsController);

  BlogsController.$inject = ['blogResolve', 'Authentication', '$state', '$scope'];

  function BlogsController(blog, Authentication, $state, $scope) {
    var vm = this;

    vm.authentication = Authentication;
    vm.blog = blog;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing blog
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.blog.$remove($state.go('root.blogs.list'));
      }
    }

    // Save blog
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.blogForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.blog._id) {
        vm.blog.$update(successCallback, errorCallback);
      } else {
        vm.blog.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('root.blogs.view', {
          blogId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    console.log('BlogsController::Init', vm);
  }
})();
