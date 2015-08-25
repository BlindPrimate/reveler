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

    // check in / check out of target revel location
    revel.updateRevel = function (revelObj, currUsr) {
      var defer = $q.defer();
      var userIdIndex = revelObj.revelers.indexOf(currUsr);
      var revelId = revelObj.db_id;
      var newRevel = {
          revel_id: revelObj.id, 
          revelers: [currUsr]
      }
      
      // return error if not logged in
      if (!currUsr) {
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
            oldRevel.revelers.push(currUsr);
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
