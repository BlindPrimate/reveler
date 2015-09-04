'use strict';

angular.module('revelerApp')
  .directive('searchForm', function () {
    return {
      templateUrl: 'app/searchForm/searchForm.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $state) {
        $scope.search = $state.params.searchTerm;

        $scope.submit = function () {
          $state.go('search', {searchTerm: $scope.search});
        }
      }
    };
  });
