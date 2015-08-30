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


    //$scope.checkIn = function (revelObj) {
      //Revel.updateRevel(revelObj, currUsrId).then(function (res) { 
        //Auth.changeCurrUserRevel(revelObj).then(function (newRevel) {
          //revelObj.db_id = res._id;
          //revelObj.revelers = res.revelers;
        //});
      //});
    //}

    init();

  });
