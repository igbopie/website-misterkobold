/**
 * Created by igbopie on 11/16/14.
 */

define(['angular', 'controllers', 'services/categoryService', 'services/productService', 'services/contactService', 'services/facebookService'], function (angular, controllers) {

  /* Controllers */

  return controllers
    .controller('DummyCtrl', ['$scope', '$http', "$location", "CategoryService",
      function ($scope, $http, $location, CategoryService) {

      }])
    .controller('IndexCtrl', ['$scope', '$http', "$location", "FacebookService",
      function ($scope, $http, $location, FacebookService) {
        $scope.feed = [];
        FacebookService.list(function(err, feed){
          $scope.feed = feed;
          if ($scope.feed.length > 0) {
            $scope.feed[0].active = true;
            // FIX THIS!!!
            setTimeout(function(){
              $('.carousel').carousel();
            });
          }
        })
      }])

    .controller('NavCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService",
      function ($scope, $http, $location, $routeParams, CategoryService) {
        $scope.categories = [];
        CategoryService.list(function(err, categories){
          if(err) console.error(err);

          $scope.categories = categories;

          $scope.categories.push({
            url: "sobre-nosotros",
            name: "Sobre nosotros"
          });
        });


        $scope.$on('$routeChangeSuccess', function(){
          var parts = $location.path().split("/");
          if(parts && parts[1]){
            angular.forEach($scope.categories, function(otherCategory){
              if (otherCategory.url === parts[1]){
                otherCategory.active = true;
              } else {
                otherCategory.active = false;
              }
            });
          } else {
            angular.forEach($scope.categories, function(otherCategory){
              otherCategory.active = false;
            });
          }
        })
      }])

    .controller('CategoryCtrl', ['$scope', '$http', "$location", "$routeParams", "$rootScope","CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, $rootScope,  CategoryService, ProductService) {
        $scope.category = {};
        $scope.products = [];
        CategoryService.findOne($routeParams.category, function(err, category){
          if(err) console.error(err);

          $scope.category = category;

          $rootScope.title = category.name;

          ProductService.listByCategory(category.id, function(err, products) {
            if(err) console.error(err);

            $scope.products = products;
          });
        });
      }])

    .controller('ProductCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, CategoryService, ProductService) {
        $scope.category = {};
        $scope.product = [];
        CategoryService.findOne($routeParams.category, function(err, category){
          if(err) console.error(err);

          $scope.category = category;

          ProductService.findOne($routeParams.product, function(err, product) {
            if(err) console.error(err);

            $scope.product = product;
          });
        });
      }])

    .controller('SearchCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, CategoryService, ProductService) {

        $scope.products = [];

        ProductService.search($routeParams.query,function(err, products) {
          if(err) console.error(err);

          $scope.products = products;
        });

      }])

    .controller('SearchFormCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService", "ProductService",
      function ($scope, $http, $location, $routeParams, CategoryService, ProductService) {
        $scope.query = "";
        $scope.search = function(query) {
          console.log($scope.query);
          $location.path('/search/'+query);
        };

      }])
    .controller('ContactCtrl', ['$scope', '$http', "$location", "$routeParams", "ContactService",
      function ($scope, $http, $location, $routeParams, ContactService) {
        $scope.sent = false;
        $scope.error = false;
        $scope.contact = function() {
          ContactService.contact($scope.email, $scope.name, $scope.phone, $scope.comment, function(err){
            if (err){
              $scope.error = true;
              $scope.sent = false;
            } else {
              $scope.error = false;
              $scope.sent = true;
            }
          });
        };

      }])
    .controller('ReclamationsCtrl', ['$scope', '$http', "$location", "$routeParams", "ContactService",
      function ($scope, $http, $location, $routeParams, ContactService) {
        $scope.sent = false;
        $scope.error = false;
        $scope.reclamation = function() {
          ContactService.reclamation($scope.email, $scope.name, $scope.phone, $scope.comment, function(err){
            if (err){
              $scope.error = true;
              $scope.sent = false;
            } else {
              $scope.error = false;
              $scope.sent = true;
            }
          });
        };

      }])

    ;

});