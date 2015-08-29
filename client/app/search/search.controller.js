'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, Revel) {

    var init = function() {
      $scope.isCheckedIn = false;
    }

    var currUsrId = Auth.getCurrentUser()._id;


    

    Revel.getRevels().then(function(res) {
      $scope.revels = res;
    });


    $scope.checkIn = function (revelObj) {
      Revel.updateRevel(revelObj, currUsrId).then(function (res) { 
        revelObj.db_id = res._id;
        revelObj.revelers = res.revelers;
      });
    }

    init();

  });
