'use strict';

angular.module('revelerApp')
  .controller('MainCtrl', function ($scope, $http, $state, Revel) {

    var init = function () {

    }

    $scope.submit = function () {
      $state.go('search', {searchTerm: search.term.value});
    }

    init();

  });
