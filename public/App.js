/* global angular */

angular.module("App", ["chart.js", "ngRoute", 'auth0.auth0']).config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "main.html"
    }).
    when("/about", {
        templateUrl: "about.html"
    }).

    when("/analytics", {
        templateUrl: "analytics.html",
        controller: "GlobalView"
    }).
    when("/integrations", {
        templateUrl: "integrations.html",
        controller: "GlobalView"
    }).

    when("/integrations/employmentsExternalApi", {
        templateUrl: "employments/employmentsExternalApi.html",
        controller: "employmentsExternalApi"
    }).
    when("/integrations/employmentsExternalApiSOS1", {
        templateUrl: "employments/employmentsExternalApiSOS1.html",
        controller: "employmentsExternalApiSOS1"
    })
    .when("/integrations/employmentsExternalApiSOS2", {
        templateUrl: "employments/employmentsExternalApiSOS2.html",
        controller: "employmentsExternalApiSOS2"
    }).
    when("/integrations/employmentsApiExternaEbola", {
        templateUrl: "employments/employmentsApiExternaEbola.html",
        controller: "employmentsApiExternaEbola"
    }).
    when("/integrations/employmentsApiExternaGeo", {
        templateUrl: "employments/employmentsApiExternaGeo.html",
        controller: "employmentsApiExternaGeo"
    }).
    when("/integrations/employmentsApiExternaMundial", {
        templateUrl: "employments/employmentsApiExternaMundial.html",
        controller: "employmentsApiExternaMundial"
    }).
    when("/integrations/employments", {
        templateUrl: "employments/EmploymentsView.html",
        controller: "EmploymentsView"
    }).
    when("/integrations/employmentsApiCompartida", {
        templateUrl: "employments/ApiCompartidaView.html",
        controller: "ApiCompartidaView"
    }).
    when("/integrations/employmentsApiCompartidaProxy", {
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
    when("/analytics/unemploymentsApiFinal1", {
        templateUrl: "unemployments/ApiFinal1.html",
        controller: "ApiFinal1Ctrl"
    }).
    when("/analytics/unemploymentsApiFinal2", {
        templateUrl: "unemployments/ApiFinal2.html",
        controller: "ApiFinal2Ctrl"
    }).
    when("/analytics/unemploymentsApiFinal34", {
        templateUrl: "unemployments/ApiFinal34.html",
        controller: "ApiFinal34Ctrl"
    }).
    when("/analytics/unemploymentsApiFinal5", {
        templateUrl: "unemployments/ApiFinal5.html",
        controller: "ApiFinal5Ctrl"
    }).
    when("/analytics/unemploymentsApiFinal6", {
        templateUrl: "unemployments/ApiFinal6.html",
        controller: "ApiFinal6Ctrl"
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
    }).
    when("/analytics/expendituresApiFinal", {
        templateUrl: "expenditures/ApiFinal.html",
        controller: "ApiFinalCtrl"
    }).
    when("/analytics/expendituresFunnyApis", {
        templateUrl: "expenditures/FunnyApis.html",
        controller: "FunnyApisCtrl"
    });
});
