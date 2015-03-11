'use strict';

define(['angular', 'services', 'services/categoryService'], function (angular, services) {
  /* Services */
  return services

    .service('ProductService', ['$http', 'CategoryService', function ($http, CategoryService) {

      var urlBase = '/data/products.json';

      ///api/comment/list
      this.listByCategory = function (categoryId, callback) {
        $http.get(urlBase, {}).success(function (data) {
          var products = [];
          angular.forEach(data, function(product){
            if (product.category === categoryId) {
              products.push(product);
            }
          });
          callback(products);
        }).error(function (error) {
          callback(error);
        });
      };

      this.findOne = function (productId,callback) {
        $http.get(urlBase, {}).success(function (data) {
          angular.forEach(data, function(product){
            if (product.url === productId) {
              var related = [];
              angular.forEach(data, function(innerProduct){

                // Manual population
                angular.forEach(product.related, function(relatedId) {
                  if (innerProduct.id === relatedId.id){
                    related.push(innerProduct);
                  }
                });
              });
              product.related = related;

              if (product.related && product.related.length > 0) {
                var callbacked = 0;
                angular.forEach(product.related, function (related) {
                  CategoryService.findOneById(related.category, function (category) {
                    related.category = category;
                    callbacked++;

                    if (callbacked >=  product.related.length ){
                      callback(product);
                    }
                  });
                });
              } else {
                callback(product);
              }

              return;
            }
          });
        }).error(function (error) {
          callback(error);
        });
      };


    }]);
});