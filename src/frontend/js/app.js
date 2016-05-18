var angular = require('angular');
require('angular-route');
require('./services');
require('./directives');
require('./controllers');
require('./controllers/indexController');

var app = angular.module('misterkobold', [
    'ngRoute',
    'misterkobold.services',
    'misterkobold.directives',
    'misterkobold.controllers'
]);


app.filter("sanitize", ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]);

module.exports = app;