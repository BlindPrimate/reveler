'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, revelFactory) {

    var currUsrId = Auth.getCurrentUser()._id;


    revelFactory.getRevels($state.params.searchTerm).success(function(revels) {
      $scope.revels = revels;
    });

    $scope.checkIn = function (revelObj) {
      revelFactory.updateRevel(revelObj, currUsrId, function (updatedRevel) {
        revelObj.db_id = updatedRevel._id;
        revelObj.revelers = updatedRevel.revelers;
      });
    }


  });
