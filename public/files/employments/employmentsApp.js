/* global angular */

angular.module("EmploymentsApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider.when("/",{
       templateUrl: "list.html",
       controller: "ListCtrl"
    }).when("/:country/:year",{
        templateUrl: "edit.html",
        controller: "EditCtrl"
    });
});