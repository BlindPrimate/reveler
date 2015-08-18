'use strict';

angular.module('revelerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/:searchTerm',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
