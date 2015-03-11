/**
 * Created by igbopie on 11/16/14.
 */

define(['angular', 'controllers', 'services/categoryService', 'services/productService'], function (angular, controllers) {

  /* Controllers */

  return controllers

    .controller('IndexCtrl', ['$scope', '$http', "$location", "CategoryService",
      function ($scope, $http, $location, CategoryService) {

      }])

    .controller('NavCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService",
      function ($scope, $http, $location, $routeParams, CategoryService) {
        $scope.categories = [];
        CategoryService.list(function(categories){
          $scope.categories = categories;

          $scope.categories.push({
            url: "/sobre-nosotros",
            name: "Sobre nosotros"
          });
        });

        $scope.selectCategory = function(category) {
          category.active = true;

          angular.forEach($scope.categories, function(otherCategory){
            if (otherCategory !== category){
              otherCategory.active = false;
            }
          });
        };
      }])

    .controller('CategoryCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, CategoryService, ProductService) {
        $scope.category = {};
        $scope.products = [];
        CategoryService.findOne($routeParams.category, function(category){
          $scope.category = category;

          ProductService.listByCategory(category.id, function(products) {
            $scope.products = products;
          });
        });
      }])
    .controller('ProductCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, CategoryService, ProductService) {
        $scope.category = {};
        $scope.product = [];
        CategoryService.findOne($routeParams.category, function(category){
          $scope.category = category;

          ProductService.findOne($routeParams.product, function(product) {
            $scope.product = product;
          });
        });
      }])

    ;

});