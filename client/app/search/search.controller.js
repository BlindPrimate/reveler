'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, revelFactory) {

    revelFactory.getRevels($state.params.searchTerm).success(function (data) {
      $scope.revels = data;
    });

  });
