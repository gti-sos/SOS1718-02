/* global angular */

angular.module("ExpendituresApp").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/expenditures";

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

    $scope.getSearch = function() {
        if (!$scope.newExpenditure.country) {
            delete $scope.newExpenditure.country;
        }
        if (!$scope.newExpenditure.year) {
            delete $scope.newExpenditure.year;
        }
        if (!$scope.newExpenditure.primary) {
            delete $scope.newExpenditure.primary;
        }
        if (!$scope.newExpenditure.secundary) {
            delete $scope.newExpenditure.secundary;
        }
        if (!$scope.newExpenditure.tertiery) {
            delete $scope.newExpenditure.tertiery;
        }
        var query = $httpParamSerializer($scope.newExpenditure);
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            $scope.expenditures = response.data;
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

    $scope.getCount = function() {
        if (!$scope.newExpenditure.country) {
            delete $scope.newExpenditure.country;
        }
        if (!$scope.newExpenditure.year) {
            delete $scope.newExpenditure.year;
        }
        if (!$scope.newExpenditure.primary) {
            delete $scope.newExpenditure.primary;
        }
        if (!$scope.newExpenditure.secundary) {
            delete $scope.newExpenditure.secundary;
        }
        if (!$scope.newExpenditure.tertiery) {
            delete $scope.newExpenditure.tertiery;
        }
        var query = $httpParamSerializer($scope.newExpenditure);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            $scope.count=response.data.length;
        });
    };
    getExpenditures();
}]);
