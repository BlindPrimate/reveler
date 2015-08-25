'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, Revel) {

    var currUsrId = Auth.getCurrentUser()._id;


    Revel.getRevels().then(function(revels) {
      $scope.revels = revels;
    });


    $scope.checkIn = function (revelObj) {
      //console.log(Revel.updateRevel(revelObj, currUsrId));
      Revel.updateRevel(revelObj, currUsrId).then(function (updatedRevel) { 
        revelObj.db_id = updatedRevel._id;
        revelObj.revelers = updatedRevel.revelers;
      });
    }


  });
