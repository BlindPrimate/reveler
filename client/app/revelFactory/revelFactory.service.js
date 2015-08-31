'use strict';

angular.module('revelerApp')
  .factory('Revel', function ($q, $http, $stateParams, Auth) {
    // Service logic
    // ... 

    var baseUrl = 'api/revels/'

    var revel = this;

    // get all revels
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

    // get single revel 
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
    revel.updateRevel = function (revelObj) {
      var defer = $q.defer();
      var currUsr = Auth.getCurrentUser()._id;
      var userIdIndex = revelObj.revelers.indexOf(currUsr);
      var revelId = revelObj._id || '';
  
      if (userIdIndex === -1) {
        revelObj.revelers.push(currUsr);
        revelObj.userCheckedIn = true;
      } else {
        revelObj.revelers.splice(userIdIndex, 1);
        revelObj.userCheckedIn = false;
      }


      if (revelId) {
        $http.put(baseUrl + revelId, revelObj)
          .success(function (res) {
            defer.resolve(res);
          })
          .error(function (err, status) {
            defer.reject(err);
          });
        return defer.promise;
      } else {
        $http.post(baseUrl + revelId, revelObj)
          .success(function (res) {
            defer.resolve(res);
          })
          .error(function (err, status) {
            defer.reject(err);
          });
        return defer.promise;
      }
    }

    return revel;
  });
