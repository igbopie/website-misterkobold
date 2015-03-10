/**
 * Created by igbopie on 3/7/15.
 */

/**
 * Created by igbopie on 02/09/14.
 */

define([
  'angular',
  'angularMoment',
  'angularRoute',
  'angularCookies',
  'angularAria',
  'angularAnimate',

  'services',
  'directives',

  'controllers',
  'controllers/indexController'
], function (angular, angularMoment) {
  var app = angular.module('misterkobold', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'ngAria',
    'angularMoment',
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
