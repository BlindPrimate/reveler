'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, revelFactory) {

    revelFactory.getRevels("willoughby,oh").success(function (data) {
      $scope.revels = data;
    });



  });
