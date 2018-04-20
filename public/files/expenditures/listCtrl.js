/* global angular */

angular.module("ExpendituresApp").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/expenditures";

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
        var query = $httpParamSerializer($scope.newExpenditure);
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            //clearExpenditures();
            console.log("Country: " + $scope.newExpenditure.country);
            console.log("Year: " + $scope.newExpenditure.year);
            console.log("Primary: " + $scope.newExpenditure.primary);
            console.log("Secundary: " + $scope.newExpenditure.secundary);
            console.log("Tertiery: " + $scope.newExpenditure.tertiery);

            if (query.country == "") {
                delete query.country;
            }
            if (query.year == "") {
                delete query.year;
            }
            if (query.primary == "") {
                delete query.primary;
            }
            if (query.secundary == "") {
                delete query.secundary;
            }
            if (query.tertiery == "") {
                delete query.tertiery;
            }
            console.log(query);
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

    function clearExpenditures() {
        $scope.expenditures = "";
    }
    //getExpenditures();
}]);
