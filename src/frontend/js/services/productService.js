'use strict';

var angular = require('angular');
var services = require('../services');
require('./categoryService');

/* Services */
services.service('ProductService', ['$http', 'CategoryService', function ($http, CategoryService) {

    var urlBase = '/data/products.json';

    var productCache = [];

    var fetch = function (callback) {
        //console.log(productCache);
        if (productCache.length > 0) {
            callback(null, angular.copy(productCache));
        } else {
            $http.get(urlBase, {}).success(function (data) {
                productCache = angular.copy(data);
                callback(null, data);
            }).error(function (error) {
                callback(error);
            })
        }
    };

    var match = function (p, query) {
        var found = p.name.toLowerCase().indexOf(query) != -1;
        if (!found && p.description) {
            found = p.description.toLowerCase().indexOf(query) != -1;
        }
        if (!found && p.longDescription) {
            found = p.longDescription.toLowerCase().indexOf(query) != -1;
        }
        return found;
    };

    this.search = function (query, callback) {
        fetch(function (err, data) {
            if (err) return callback(err);

            var products = [];
            angular.forEach(data, function (product) {
                if (match(product, query)) {
                    products.push(product);
                }
            });
            var callbacked = 0;
            angular.forEach(products, function (product) {
                CategoryService.findOneById(product.category, function (err, category) {
                    if (err) return callback(err);

                    product.category = category;
                    callbacked++;

                    if (callbacked >= products.length) {
                        callback(null, products);
                    }
                });
            });
        });
    };

    ///api/comment/list
    this.listByCategory = function (categoryId, callback) {
        fetch(function (err, data) {
            if (err) return callback(err);

            var products = [];
            angular.forEach(data, function (product) {
                if (product.category === categoryId) {
                    products.push(product);
                }
            });
            callback(null, products);
        });
    };

    this.findOne = function (productId, callback) {
        fetch(function (err, data) {
            if (err) return callback(err);

            angular.forEach(data, function (product) {
                if (product.url === productId) {
                    var related = [];
                    angular.forEach(data, function (innerProduct) {

                        // Manual population
                        angular.forEach(product.related, function (relatedId) {
                            if (innerProduct.id === relatedId.id) {
                                related.push(innerProduct);
                            }
                        });
                    });
                    product.related = angular.copy(related);

                    if (product.related && product.related.length > 0) {
                        var callbacked = 0;
                        angular.forEach(product.related, function (related) {
                            CategoryService.findOneById(related.category, function (err, category) {
                                related.category = angular.copy(category);
                                callbacked++;

                                if (callbacked >= product.related.length) {
                                    callback(err, product);
                                }
                            });
                        });
                    } else {
                        callback(null, product);
                    }

                    return;
                }
            });
        });
    };
}]);