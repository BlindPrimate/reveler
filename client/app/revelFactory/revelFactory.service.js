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
      //var newRevel = {
          //revel_id: revelObj._id, 
          //revelers: [currUsr]
      //}


      if (userIdIndex === -1) {
        revelObj.revelers.push(currUsr);
      } else {
        revelObj.revelers.splice(userIdIndex, 1);
      }

      if (revelId) {
        console.log('check');
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

    
      // return error if not logged in
      //if (!currUsr) {
        //defer.reject('User not Logged In');
        //return defer.promise;
      //}

        //checks user in or out based on current checkin status
      //if (!revelId) {   // if target revel doesn't exist in db, create it
         //$http.post(baseUrl, newRevel)
           //.success(function (res) {
             //defer.resolve(res);
           //})
           //.error(function (err, status) {
             //defer.reject(err);
           //});
         //return defer.promise;
      //} else {    // if db entry exists, checkin/checkout based on current user status
        //return revel.getRevel(revelId).then(function (revel) {
          //if (userIdIndex === -1) {
            //revel.revelers.push(currUsr);
          //} else {
            //revel.revelers.splice(userIdIndex, 1);
          //}

          //$http.put(baseUrl + revelId, revel)
            //.success(function (res) {
              //defer.resolve(res);
            //})
            //.error(function (err, status) {
              //defer.reject(err);
            //});
          //return defer.promise;
        //});
      //}
    }

    revel.checkin = function (revelObj) {
      var defer = $q.defer();
      var userId = Auth.getCurrentUser()._id;
      $http.put('/api/users/checkin/' + userId + '/' + revelObj._id, revelObj)
        .success(function (newRevel) {
          defer.resolve(newRevel);
        })
        .error(function (err) {
          defer.reject(err);
        });
      return defer.promise;
    }


    return revel;
  });
