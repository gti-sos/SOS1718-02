/* global angular */

angular.module("ExpendituresApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider.when("/",{
       templateUrl: "list.html",
       controller: "ListCtrl"
    });
    
    /*$routeProvider.when("/",{
       templateUrl: "list.html",
       controller: "ListCtrl"
    });*/
});