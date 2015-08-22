'use strict';

angular.module('revelerApp')
  .controller('MainCtrl', function ($scope, $http, $state) {

    $scope.submit = function () {
      $state.go('search', {searchTerm: search.term.value});
    }




  });
