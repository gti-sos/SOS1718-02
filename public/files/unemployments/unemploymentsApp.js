/* global angular */
angular.module("UnemploymentsApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "list.html",
        controller: "ListCtrl"
    }).when("/:country/:year", {
        templateUrl: "edit.html",
        controller: "EditCtrl"
    });
});
