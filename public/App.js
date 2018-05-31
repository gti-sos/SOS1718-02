/* global angular */

angular.module("App", ["chart.js", "ngRoute", 'auth0.auth0']).config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "main.html"
    }).
    
    when("/analytics", {
        templateUrl: "analytics.html",
        controller: "GlobalView"
    }).
    
    
    
    
    
    when("/integrations/employmentsExternalApi", {
        templateUrl: "employments/employmentsExternalApi.html",
        controller: "employmentsExternalApi"
    }).
    
    
    when("/analytics/employmentsApiExternaGeo", {
        templateUrl: "employments/employmentsApiExternaGeo.html",
        controller: "employmentsApiExternaGeo"
    }).
    when("/analytics/employmentsApiExternaMundial", {
        templateUrl: "employments/employmentsApiExternaMundial.html",
        controller: "employmentsApiExternaMundial"
    }).
    when("/analytics/employments", {
        templateUrl: "employments/EmploymentsView.html",
        controller: "EmploymentsView"
    }).
    when("/analytics/employmentsApiCompartida", {
        templateUrl: "employments/ApiCompartidaView.html",
        controller: "ApiCompartidaView"
    }).
    when("/analytics/employmentsApiCompartidaProxy", {
        templateUrl: "employments/ApiCompartidaViewProxy.html",
        controller: "ApiCompartidaViewProxy"
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
    when("/analytics/unemploymentsApiCompartida", {
        templateUrl: "unemployments/ApiCompartida.html",
        controller: "ApiCompartidaCtrl"
    }).
    when("/analytics/unemploymentsApiCompartidaProxy", {
        templateUrl: "unemployments/ApiCompartidaProxy.html",
        controller: "ApiCompartidaProxyCtrl"
    }).

    when("/expenditures", {
        templateUrl: "expenditures/ExpendituresList.html",
        controller: "ExpendituresListCtrl"
    }).when("/expenditures/:country/:year", {
        templateUrl: "expenditures/ExpendituresEdit.html",
        controller: "ExpendituresEditCtrl"
    }).
    when("/analytics/expendituresApiCompartida", {
        templateUrl: "expenditures/ApiCompartidaView.html",
        controller: "ApiCompartidaViewCtrl"
    }).
    when("/analytics/expendituresApiCompartidaProxy", {
        templateUrl: "expenditures/ApiCompartidaViewProxy.html",
        controller: "ApiCompartidaViewProxyCtrl"
    });
});
