'use strict';

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

var jQuery = require('jquery');

window.jQuery = jQuery;

// AngularMoment needs to be loaded this way...
var bootstrap = require('bootstrap');
var angular = require('angular');
var app = require('./app');
var routes = require('./routes');


angular.element(document.getElementsByTagName('html')[0]);
angular.element().ready(function () {
    angular.resumeBootstrap([app['name']]);
});