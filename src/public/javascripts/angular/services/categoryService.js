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

      this.findOne = function (categoryId,callback) {
        $http.get(urlBase, {}).success(function (data) {
          var found;
          angular.forEach(data, function(category){
            if (category.url === categoryId) {
              found = category;
              return;
            }
          });
          callback(found);
        }).error(function (error) {
          callback(error);
        });
      };

      this.findOneById = function (categoryId,callback) {
        $http.get(urlBase, {}).success(function (data) {
          var found;
          angular.forEach(data, function(category){
            if (category.id === categoryId) {
              found = category;
              return;
            }
          });
          callback(found);
        }).error(function (error) {
          callback(error);
        });
      };

    }]);
});