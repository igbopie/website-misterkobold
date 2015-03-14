/**
 * Created by igbopie on 11/16/14.
 */

'use strict';

define(['angular', 'app'], function (angular, app) {

  return app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider, $location) {

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'IndexCtrl'
      }).
      when('/legal', {
        templateUrl: 'partials/legal.html',
        controller: 'DummyCtrl'
      }).
      when('/sobre-nosotros', {
        templateUrl: 'partials/aboutus.html',
        controller: 'DummyCtrl'
      }).
      when('/contacto', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      }).
      when('/reclamaciones', {
        templateUrl: 'partials/reclamations.html',
        controller: 'ReclamationsCtrl'
      }).
      when('/search/:query', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/:category', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryCtrl'
      }).
      when('/:category/:product', {
        templateUrl: 'partials/product.html',
        controller: 'ProductCtrl'
      }).

      otherwise({
        redirectTo: '/'
      });
  }]);
});