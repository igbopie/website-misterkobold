/**
 * Created by igbopie on 3/7/15.
 */

/**
 * Created by igbopie on 02/09/14.
 */

define([
  'angular',
  'angularRoute',

  'services',
  'directives',

  'controllers',
  'controllers/indexController'
], function (angular) {
  var app = angular.module('misterkobold', [
    'ngRoute',
    'misterkobold.services',
    'misterkobold.directives',
    'misterkobold.controllers'
  ]);


  app.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
  }]);

  return app;
});
