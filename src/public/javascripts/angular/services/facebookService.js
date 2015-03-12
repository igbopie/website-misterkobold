'use strict';

define(['angular', 'services'], function (angular, services) {
  /* Services */
  return services

    .service('FacebookService', ['$http', function ($http) {

      var url = 'https://graph.facebook.com/v2.2/122120441164357/feed?access_token=';
      var token = "489057514487950|iZIoS2ZXNz0foTj5dzK6Uq0d86s";


      var fetch = function(callback) {
        $http.get(url+token, {}).success(function (data) {
          var posts = []
          angular.forEach(data.data, function(post){
            if(post.message){
              posts.push(post);
            }
          });
          console.log(posts);
          callback(null, posts);
        }).error(function (error) {
          callback(error);
        })
      }

      ///api/comment/list
      this.list = function (callback) {
        fetch(callback);
      };


    }]);
});