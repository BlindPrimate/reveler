'use strict';

angular.module('revelerApp')
  .controller('MainCtrl', function ($scope, $http, $state) {

    $scope.submit = function () {
      console.log(search.term.value)
      $state.go('search', {searchTerm: search.term.value});
    }

  });
