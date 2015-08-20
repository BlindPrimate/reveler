'use strict';

angular.module('revelerApp')
  .factory('revelFactory', function ($http) {
    // Service logic
    // ...


    // Public API here
    return {
      getRevels: function (location) {
        return $http.get('/api/revels/search/' + location);
      },
      getRevel: function (revel_id) {
        return $http.get('/api/revels/' + revel_id);
      },
      updateRevel: function (revel_id, locationName, updatedRevel) {
        return $http.put('api/revels/' + revel_id, updatedRevel);
      } 
    };
  });
