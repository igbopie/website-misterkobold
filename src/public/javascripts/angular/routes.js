/**
 * Created by igbopie on 11/16/14.
 */

'use strict';

define(['angular', 'app'], function (angular, app) {

  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'IndexCtrl'
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