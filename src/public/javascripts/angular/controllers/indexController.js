/**
 * Created by igbopie on 11/16/14.
 */

define(['angular', 'controllers', 'services/questionService', 'services/categoryService'], function (angular, controllers) {

  /* Controllers */

  return controllers

    .controller('IndexCtrl', ['$scope', '$http', "$location", "QuestionService",
      function ($scope, $http, $location, QuestionService) {

      }])

    .controller('NavCtrl', ['$scope', '$http', "$location", "$routeParams", "CategoryService",
      function ($scope, $http, $location, $routeParams, CategoryService) {
        $scope.categories = [];
        CategoryService.list(function(categories){
          console.log(categories);
          $scope.categories = categories;
        })


      }])

    .controller('QuestionDetailCtrl', ['$scope', '$http', "$location", "$routeParams", "QuestionService", "CommentService",
      function ($scope, $http, $location, $routeParams, QuestionService, CommentService) {


      }])
    ;

});