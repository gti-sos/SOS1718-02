/* global angular */

angular.module("UnemploymentsApp").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/unemployments";

    $scope.addUnemployment = function() {
        $http.post(BASE_API_PATH, $scope.newUnemployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getUnemployments();
        });
    };

    $scope.deleteUnemployment = function(country, year) {
        $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newUnemployment)
            .then(function(response) {
                $scope.status = response.data;
                getUnemployments();
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH).then(function(response) {
            $scope.status = response.data;
            getUnemployments();
        });
    };

    $scope.getSearch = function() {
        if (!$scope.newUnemployment.country) {
            delete $scope.newUnemployment.country;
        }
        if (!$scope.newUnemployment.year) {
            delete $scope.newUnemployment.year;
        }
        if (!$scope.newUnemployment.young) {
            delete $scope.newUnemployment.young;
        }
        if (!$scope.newUnemployment.adult) {
            delete $scope.newUnemployment.adult;
        }
        if (!$scope.newUnemployment.old) {
            delete $scope.newUnemployment.old;
        }
        if (!$scope.newUnemployment.longterm) {
            delete $scope.newUnemployment.longterm;
        }
        var query = $httpParamSerializer($scope.newUnemployment);
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            $scope.unemployments = response.data;
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getUnemployments();
            $scope.status = response.data;
        });
    };

    function getUnemployments() {
        $http.get(BASE_API_PATH).then(function(response) {
            $scope.unemployments = response.data;
        });
    }
    
    function prueba(){
        console.log("Pulsado el raton");
    }

    $scope.getCount = function() {
        if (!$scope.newUnemployment.country) {
            delete $scope.newUnemployment.country;
        }
        if (!$scope.newUnemployment.year) {
            delete $scope.newUnemployment.year;
        }
        if (!$scope.newUnemployment.young) {
            delete $scope.newUnemployment.young;
        }
        if (!$scope.newUnemployment.adult) {
            delete $scope.newUnemployment.adult;
        }
        if (!$scope.newUnemployment.old) {
            delete $scope.newUnemployment.old;
        }
        if (!$scope.newUnemployment.longterm) {
            delete $scope.newUnemployment.longterm;
        }
        var query = $httpParamSerializer($scope.newUnemployment);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            $scope.count=response.data.length;

        });
    };
    getUnemployments();
}]);
