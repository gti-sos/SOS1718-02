/* global angular */

angular.module("App", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "main.html"
    }).
    
    when("/employments", {
        templateUrl: "employments/EmploymentsList.html",
        controller: "EmploymentsListCtrl"
    }).when("/employments/:country/:year", {
        templateUrl: "employments/EmploymentsEdit.html",
        controller: "EmploymentsEditCtrl"
    }).
    
    when("/unemployments", {
        templateUrl: "unemployments/UnemploymentsList.html",
        controller: "UnemploymentsListCtrl"
    }).when("/unemployments/:country/:year", {
        templateUrl: "unemployments/UnemploymentsEdit.html",
        controller: "UnemploymentsEditCtrl"
    }).
    
    when("/expenditures", {
        templateUrl: "expenditures/ExpendituresList.html",
        controller: "ExpendituresListCtrl"
    }).when("/expenditures/:country/:year", {
        templateUrl: "expenditures/ExpendituresEdit.html",
        controller: "ExpendituresEditCtrl"
    });

});
