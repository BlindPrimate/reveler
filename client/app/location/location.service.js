'use strict';

angular.module('revelerApp')
  .factory('Location', function ($http) {
    // Service logic
    // ...
    var url = "http://ipinfo.io";

    // Public API here
    return {
      getLocation: function () {
        return $http.get(url);
      }
    }
  });
