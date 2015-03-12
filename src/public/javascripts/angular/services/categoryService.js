'use strict';

define(['angular', 'services'], function (angular, services) {
  /* Services */
  return services

    .service('CategoryService', ['$http', function ($http) {

      var urlBase = '/data/categories.json';

      var categoryCache = [];

      var fetch = function(callback) {
        //console.log(categoryCache);
        if (categoryCache.length > 0) {
          callback(null,  angular.copy(categoryCache));
        } else {
          $http.get(urlBase, {}).success(function (data) {
            categoryCache =  angular.copy(data);
            callback(null, data);
          }).error(function (error) {
            callback(error);
          })
        }
      };

      ///api/comment/list
      this.list = function (callback) {
        fetch(callback);
      };

      this.findOne = function (categoryId, callback) {
        fetch(function (err, data) {
          if(err) return callback(err);

          var found;
          angular.forEach(data, function(category){
            if (category.url === categoryId) {
              found = category;
              return;
            }
          });
          callback(null, found);
        })
      };

      this.findOneById = function (categoryId,callback) {
        fetch(function (err, data) {
          if(err) return callback(err);

          var found;
          angular.forEach(data, function(category){
            if (category.id === categoryId) {
              found = category;
              return;
            }
          });
          callback(null, found);
        })
      };

    }]);
});