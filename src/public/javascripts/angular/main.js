/**
 * Created by igbopie on 11/16/14.
 */

'use strict';

require.config({
  paths: {
    moment: '/libs/moment/moment',
    jquery: '/libs/jquery/dist/jquery.min',
    bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',
    angular: '/libs/angular/angular.min',
    angularRoute: '/libs/angular-route/angular-route.min'
  },
  shim: {
    'moment': {
      deps: [],
      'exports': 'moment'
    },
    'jquery': {
      deps: [],
      'exports': 'jquery'
    },
    'bootstrap': {
      deps: ['jquery'],
      'exports': 'bootstrap'
    },
    'angular': {
      'exports': 'angular'
    },

    'angularRoute': {
      deps: ['angular'],
      'exports': 'angular.route'
    }

  },
  priority: [
    "angular"
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

// AngularMoment needs to be loaded this way...
require([
  'bootstrap',
  'angular',
  'app',
  'routes'
], function (bootstrap, angular, app, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
      angular.resumeBootstrap([app['name']]);
    });
});