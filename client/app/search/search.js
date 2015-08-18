'use strict';

angular.module('revelerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:term',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
