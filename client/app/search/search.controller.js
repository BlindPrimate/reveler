'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, revelFactory) {

    revelFactory.getRevels($state.params.searchTerm).success(function(revels) {
      $scope.revels = revels;
    });

    $scope.checkIn = function (revelObj) {
      revelFactory.updateRevel(revelObj, function (response) {
        angular.forEach($scope.revels.businesses, function (revel) {
        //$scope.revels = $scope.revels.map(function (revel) {
          if (revel.db_id === response._id) {
            revel.checkins += 1;
            return revel;
          } else {
            return revel;
          }
        })
      });
      //revelFactory.getRevel(revel_id).success(function(revel) {
        //revel.checkins += 1;
        //revelFactory.updateRevel(revel._id, revel.revel_name, revel).success(function (postedRevel) {
          
        //})
      //});
    }


  });
