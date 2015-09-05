'use strict';

angular.module('revelerApp')
  .directive('searchForm', function () {
    return {
      templateUrl: 'app/searchForm/searchForm.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $state, Location) {

        var init = function () {
          if ($state.params.searchTerm) {
            $scope.search = $state.params.searchTerm;
          } else {
            $scope.setToLocation();
          }
        }

        $scope.setToLocation = function () {
          Location.getLocation().then(function (response) {
            $scope.search = response.data.city + ', ' + response.data.region;
          });
        }

        $scope.submit = function () {
          $state.go('search', {searchTerm: $scope.search});
        }

        init();

      }
    };
  });
