/* global angular */

angular.module("ExpendituresApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider.when("/",{
       templateUrl: "list.html",
       controller: "ListCtrl"
    }).when("/:country/:year",{
        templateUrl: "edit.html",
        controller: "EditCtrl"
    });
});