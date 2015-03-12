'use strict';

define(['angular', 'services'], function (angular, services) {
  /* Services */
  return services

    .service('ContactService', ['$http', function ($http) {

      var reclamation = '/reclamation';
      var contact = '/contact';

      this.contact = function (email, name, phone, comments, callback) {
        $http.post(contact, {email: email, name: name, phone: phone, comments: comments}).success(function () {
          callback(null);
        }).error(function (error) {
          callback(error);
        })
      };

      this.reclamation = function (email, name, phone, comments, callback) {
        $http.post(reclamation, {email: email, name: name, phone: phone, comments: comments}).success(function () {
          callback(null);
        }).error(function (error) {
          callback(error);
        })
      };

    }]);
});