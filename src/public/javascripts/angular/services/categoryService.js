'use strict';

define(['angular', 'services'], function (angular, services) {
  /* Services */
  return services

    .service('CategoryService', ['$http', function ($http) {

      var urlBase = '/data/categories.json';

      ///api/comment/list
      this.list = function (callback) {
        $http.get(urlBase, {}).success(function (data) {
          callback(data);
        }).error(function (error) {
          callback(error);
        });
      };

    }]);
});