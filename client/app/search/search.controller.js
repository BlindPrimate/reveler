'use strict';

angular.module('revelerApp')
  .controller('SearchCtrl', function ($scope, $state, revelFactory) {

    revelFactory.getRevels($state.params.searchTerm).success(function(revels) {
      $scope.revels = revels;
    });

    $scope.checkIn = function (revel_id) {
      revelFactory.getRevel(revel_id).success(function(revel) {
        revel.checkins += 1;
        console.log(revel);
        revelFactory.updateRevel(revel._id, revel.revel_name, revel).success(function (postedRevel) {

        })
      });
    }


  });
