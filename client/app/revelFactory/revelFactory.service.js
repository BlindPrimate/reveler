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
      updateRevel: function (revelObj, user_id, callbackFn) {

        var userIdIndex = revelObj.revelers.indexOf(user_id);

        var newRevel = {
            revel_id: revelObj.id, 
            revelers: [user_id]
        }

        if (!revelObj.db_id) {
          $http.post('api/revels/', newRevel).success(function (postedRevel) {
            callbackFn(postedRevel);
          });
        } else if (userIdIndex !== -1) {
          $http.get('/api/revels/' + revelObj.db_id).success(function(revel) {
            revel.revelers.splice(userIdIndex, 1);
            $http.put('api/revels/' + revelObj.db_id, revel).success(function (postedRevel) {
              callbackFn(postedRevel);
            });
          });
        } else {
          $http.get('/api/revels/' + revelObj.db_id).success(function(revel) {
            revel.revelers.push(user_id);
            $http.put('api/revels/' + revelObj.db_id, revel).success(function (postedRevel) {
              callbackFn(postedRevel);
            });
          });
        }
      }
    };
  });
