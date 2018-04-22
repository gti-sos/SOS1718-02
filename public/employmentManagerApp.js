 /*global angular */
angular.module("EmploymentManagerApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "EmploymentsList.html",
        controller: "EmploymentsListCtrl"
    }).when("/employments/:country/:year",{
        templateUrl: "EmploymentsEdit.html",
        controller: "EmploymentsEditCtrl"
    });
});