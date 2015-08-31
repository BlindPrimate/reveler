'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, Auth, Revel) {

    var currUsrId = Auth.getCurrentUser()._id;

    //Auth.getCurrUserRevel().then(function (currRevel) {
      //console.log(currRevel);
    //})

    var init = function() {
      Revel.getRevels().then(function(res) {
        $scope.revels = res;
      });
    }



    $scope.checkIn = function (revelObj) {
      Revel.updateRevel(revelObj).then(function (res) { 
        revelObj._id = res._id;
        revelObj.revelers = res.revelers;
      });
    }

    init();

  });
