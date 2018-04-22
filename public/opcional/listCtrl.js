/* global angular */

angular.module("App").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/expenditures";
    
    var BASE_API_PATH_2 = "/api/v2/employments";
    
    
    var BASE_API_PATH_3 = "/api/v1/unemployments";

    $scope.addExpenditure = function() {
        $http.post(BASE_API_PATH, $scope.newExpenditure).then(function(response) {
            
            $scope.status = "Status: " + response.status;
            
            getExpenditures();
        });
    };

    $scope.deleteExpenditure = function(country, year) {
        $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newExpenditure)
            .then(function(response) {
                $scope.status = response.data;
                getExpenditures();
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH).then(function(response) {
            $scope.status = response.data;
            getExpenditures();
        });
    };

   
    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getExpenditures();
            $scope.status = response.data;
        });
    };
    

    function getExpenditures() {
        $http.get(BASE_API_PATH).then(function(response) {
            $scope.expenditures = response.data;
        });
    }
     





   
    getExpenditures();
    
    
    $scope.addEmployment = function() {
        $http.post(BASE_API_PATH_2, $scope.newEmployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getEmployment();
        });
    };

    $scope.deleteEmployment = function(country, year) {
        $http.delete(BASE_API_PATH_2 + "/" + country + "/" + year, $scope.newEmployment)
            .then(function(response) {
                $scope.status = response.data;
                getEmployment();
            });
    };

    $scope.deleteAllEmployment = function() {
        $http.delete(BASE_API_PATH_2).then(function(response) {
            $scope.status = response.data;
            getEmployment();
        });
    };
    
     $scope.getLoad = function() {
        $http.get(BASE_API_PATH_2 + "/loadInitialData").then(function(response) {
            getEmployment();
            $scope.status = response.data;
        });
    };

    function getEmployment() {
        $http.get(BASE_API_PATH_2).then(function(response) {
            $scope.employments = response.data;
        });
    }
    
    getEmployment();
    
    
    
    
    
    
    
    
    
     $scope.addUnemployment = function() {
        $http.post(BASE_API_PATH_3, $scope.newUnemployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getUnemployment();
        });
    };

    $scope.deleteUnemployment = function(country, year) {
        $http.delete(BASE_API_PATH_3 + "/" + country + "/" + year, $scope.newUnemployment)
            .then(function(response) {
                $scope.status = response.data;
                getUnemployment();
            });
    };

    $scope.deleteAllUnemployment = function() {
        $http.delete(BASE_API_PATH_3).then(function(response) {
            $scope.status = response.data;
            getUnemployment();
        });
    };
    
     $scope.getLoad = function() {
        $http.get(BASE_API_PATH_3 + "/loadInitialData").then(function(response) {
            getUnemployment();
            $scope.status = response.data;
        });
    };

    function getUnemployment() {
        $http.get(BASE_API_PATH_3).then(function(response) {
            $scope.unemployments = response.data;
        });
    }
    
    getUnemployment();
    
}]);