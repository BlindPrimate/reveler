'use strict';

angular.module('revelerApp')
  .factory('revelFactory', function ($resource, $stateParams) {
    // Service logic
    // ... 
    var Search = $resource('api/revels/search/:location');

    var Revel = $resource('api/revels/:id', 
      {
        id: "@id"
      }, 
      {
        update: { method: 'PUT' }
      }
    );

    // Public API here
    return {
      getRevels: function (callback) {
        Search.get( {location: $stateParams.searchTerm }, function (res) {
          callback(res);
        });
      },
      updateRevel: function (revelObj, user_id, callback) {

        var userIdIndex = revelObj.revelers.indexOf(user_id);

        var newRevel = {
            revel_id: revelObj.id, 
            revelers: [user_id]
        }

        // checks if selected revel has any checkins creates new revel if not
        if (revelObj.db_id) {
          var revel = Revel.get({ id: revelObj.db_id });
          if (userIdIndex !== -1) {
            revel.$promise.then(function (revel) {
              revel.revelers.splice(userIdIndex, 1);
              revel.$update( {id: revelObj.db_id}, function (res) {
                callback(res);
              });
            });
          } else {
            revel.$promise.then(function (revel) {
              revel.revelers.push(user_id);
              revel.$update( {id: revelObj.db_id}, function (res) {
                callback(res);
              });
            });
          }
        } else {
          Revel.save(newRevel, function (res) {
            callback(res);
          });
        }
      }
    };
  });
