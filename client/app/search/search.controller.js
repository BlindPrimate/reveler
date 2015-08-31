'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, Revel) {

    var currUsrId = Auth.getCurrentUser()._id;

    var init = function() {
      Revel.getRevels().then(function(res) {
        $scope.revels = res;
      });
    }

    $scope.checkIn = function (revelObj) {
      Revel.updateRevel(revelObj).then(function (res) { 
        angular.merge(revelObj, res);
      });
    }

    init();

  });
