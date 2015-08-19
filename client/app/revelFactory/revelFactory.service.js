'use strict';

angular.module('revelerApp')
  .factory('revelFactory', function ($http) {
    // Service logic
    // ...


    // Public API here
    return {
      getRevels: function (location) {
        return $http.get('/api/revels/' + location);
      }
    };
  });
