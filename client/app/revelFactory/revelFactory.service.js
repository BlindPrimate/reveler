'use strict';

angular.module('revelerApp')
  .factory('Revel', function ($q, $http, $stateParams) {
    // Service logic
    // ... 

    var baseUrl = 'api/revels/'

    var revel = this;

    // all revels
    revel.getRevels = function () {
      var defer = $q.defer();
      $http.get(baseUrl + 'search/' + $stateParams.searchTerm)
        .success(function (res) {
          defer.resolve(res);
        })
        .error(function (err, status) {
          defer.reject(err);
        });
      return defer.promise;
    }

    // single revel 
    revel.getRevel = function (revelId) {
      var defer = $q.defer();
      $http.get(baseUrl + revelId)
        .success(function (res) {
          defer.resolve(res);
        })
        .error(function (err, status) {
          defer.reject(err);
        });
      return defer.promise;
    }

    
    revel.updateRevel = function (revelObj, user_id) {
      var defer = $q.defer();
      var userIdIndex = revelObj.revelers.indexOf(user_id);
      var revelId = revelObj.db_id;
      var newRevel = {
          revel_id: revelObj.id, 
          revelers: [user_id]
      }
      
      // return error if not logged in
      if (!user_id) {
        defer.reject('User not Logged In');
        console.error("User not Logged In");
        return defer.promise;
      }

      //  checks user in or out based on current checkin status
      if (!revelId) {   // if target revel doesn't exist in db, create it
         $http.post(baseUrl, newRevel)
           .success(function (res) {
             defer.resolve(res);
           })
           .error(function (err, status) {
             defer.reject(err);
           });
         return defer.promise;
      } else {    // if db entry exists, checkin/checkout based on current user status
        return revel.getRevel(revelId).then(function (oldRevel) {
          if (userIdIndex === -1) {
            oldRevel.revelers.push(user_id);
          } else {
            oldRevel.revelers.splice(userIdIndex, 1);
          }

          $http.put(baseUrl + revelId, oldRevel)
            .success(function (res) {
              defer.resolve(res);
            })
            .error(function (err, status) {
              defer.reject(err);
            });
          return defer.promise;
        });
      }
    }
    return revel;
  });
