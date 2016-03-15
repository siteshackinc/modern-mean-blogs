(function() {
  'use strict';

  angular
    .module('blogs')
    .controller('BlogsListController', BlogsListController);

  BlogsListController.$inject = ['BlogsFactory', 'Authentication', '$filter'];

  function BlogsListController(BlogsFactory, Authentication, $filter) {
    var vm = this;

    vm.authentication = Authentication;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    BlogsFactory.query(function (data) {
      vm.blogs = data;
      buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      figureOutItemsToDisplay();
    };

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.blogs, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    };

    function pageChanged() {
      figureOutItemsToDisplay();
    };

    console.log('BlogsListController::Init', vm);
  }
})();
