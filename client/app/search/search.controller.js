'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, Revel, Modal) {

    var currUsrId = Auth.getCurrentUser()._id;

    var init = function() {
      $scope.isLoggedIn = Auth.isLoggedIn();
      Revel.getRevels().then(function(res) {
        $scope.revels = res;
      }, function (err) {
        $scope.loadError = true;
      });
    }

    $scope.checkIn = function (revelObj) {
      Revel.toggleCheckinStatus(revelObj, $scope.revels);
    }

    init();

  });
