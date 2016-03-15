(function() {
  'use strict';

  angular
    .module('blogs.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.blogs', {
        abstract: true,
        url: '/blogs'
      })
      .state('root.blogs.list', {
        url: '',
        data: {
          pageTitle: 'Blog Lists'
        },
        views: {
          'main@': {
            controller: 'BlogsListController',
            controllerAs: 'vm',
            templateUrl: 'modules/blogs/client/views/list.html'
          }
        }
      })
      .state('root.blogs.create', {
        url: '/create',
        resolve: {
          blogResolve: newBlog
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Create a new Blog'
        },
        views: {
          'main@': {
            controller: 'BlogsController',
            controllerAs: 'vm',
            templateUrl: 'modules/blogs/client/views/form.html'
          }
        }
      })
      .state('root.blogs.edit', {
        url: '/:blogId/edit',
        resolve: {
          blogResolve: getBlog
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Blog: {{ blogResolve.title }}'
        },
        views: {
          'main@': {
            controller: 'BlogsController',
            controllerAs: 'vm',
            templateUrl: 'modules/blogs/client/views/form.html'
          }
        }
      })
      .state('root.blogs.view', {
        url: '/:blogId',
        resolve: {
          blogResolve: getBlog
        },
        data: {
          pageTitle: '{{ blogResolve.title }}'
        },
        views: {
          'main@': {
            controller: 'BlogsController',
            controllerAs: 'vm',
            templateUrl: 'modules/blogs/client/views/view.html'
          }
        }
    });
  }

  getBlog.$inject = ['$stateParams', 'BlogsFactory'];

  function getBlog($stateParams, BlogsFactory) {
    return BlogsFactory.get({
      blogId: $stateParams.blogId
    }).$promise;
  }

  newBlog.$inject = ['BlogsFactory'];

  function newBlog(BlogsFactory) {
    return new BlogsFactory();
  }
})();
