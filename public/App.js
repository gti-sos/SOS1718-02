/* global angular */

angular.module("App", ["chart.js", "ngRoute"]).config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "main.html"
    }).
    when("/analytics", {
        templateUrl: "analytics.html"
    }).
    when("/analytics/employments", {
        templateUrl: "employments/EmploymentsView.html",
        controller: "EmploymentsView"
    }).
    when("/analytics/unemployments", {
        templateUrl: "unemployments/UnemploymentsView.html",
        controller: "UnemploymentsView"
    }).
    when("/analytics/expenditures", {
        templateUrl: "expenditures/ExpendituresView.html",
        controller: "ExpendituresView"
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
