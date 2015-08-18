'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, revelFactory) {

    console.log($state.params.searchTerm);
    revelFactory.getRevels($state.params.searchTerm).success(function (data) {
      $scope.revels = data;
    });


    });
