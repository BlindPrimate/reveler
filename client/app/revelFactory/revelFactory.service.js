'use strict';

angular.module('revelerApp')
  .factory('Revel', function ($q, $http, $stateParams, Auth) {
    // Service logic
    // ... 

    var revel = this;
    var baseUrl = 'api/revels/'

    var checkin = function (revelObj) {
      if (revelObj._id) {
        return $http.put(baseUrl + revelObj._id, revelObj).then(function (response) {
          return response.data;
        });
      } else {
        return $http.post(baseUrl, revelObj).then(function (response) {
          return response.data;
        });
      }
    }

    var clearUserCheckins = function (revels) {
      var defer = $q.defer();
      var currUsr = Auth.getCurrentUser()._id;
      angular.forEach(revels, function (revel) {
        var revel = revel.revelData;
        var userIdIndex = revel.revelers.indexOf(currUsr);
        if (userIdIndex >= 0) {
          revel.revelers.splice(userIdIndex, 1);
        }
        revel.userCheckedIn = false;
        return revel;
      });

      return $http.delete(baseUrl + 'clearAll').then(function () {
        return revels;
      });
      
    }


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
    revel.toggleCheckinStatus = function (revelObj, revelObjList) {
      var currUsr = Auth.getCurrentUser()._id;
      var userIdIndex = revelObj.revelers.indexOf(currUsr);
      var revelId = revelObj._id || '';

      if (userIdIndex === -1) {
        return clearUserCheckins(revelObjList)
          .then(function () {
            revelObj.revelers.push(currUsr);
            revelObj.userCheckedIn = true;
            return checkin(revelObj).then(function (newRevel) {
              return newRevel;
            });
          });
      } else {
        revelObj.revelers.splice(userIdIndex, 1);
        revelObj.userCheckedIn = false;
        return clearUserCheckins(revelObjList).then(function (newRevels) {
          return newRevels;
        });
      }
    }


return revel;

  });
