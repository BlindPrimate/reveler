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
      //updateRevel: function (revel_id, locationName, updatedRevel) {
        //return $http.put('api/revels/' + revel_id, updatedRevel);
      //},
      updateRevel: function (revelObj, callbackFn) {
        if (!revelObj.db_id) {
          $http.get('/api/revels/' + revelObj.db_id).success(function(revel) {
            $http.post('api/revels/', {revel_id: revelObj.id, checkins: 1}).success(function (postedRevel) {
              callbackFn(postedRevel);
            })
          }); 
        } else {
          $http.get('/api/revels/' + revelObj.db_id).success(function(revel) {
            revel.checkins += 1;
            $http.put('api/revels/' + revelObj.db_id, revel).success(function (postedRevel) {
              callbackFn(postedRevel);
            });
          });
        }
      },
      
    };
  });
