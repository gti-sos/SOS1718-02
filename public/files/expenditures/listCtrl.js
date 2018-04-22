/* global angular */

angular.module("ExpendituresApp").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API = "/api/v2";
    var BASE_API_PATH = "/api/v2/expenditures";
    var BASE_API_PATH_LIMIT = "/api/v2/expenditures?&limit=10";
    var offsetP = 0;
    var dataCount = 0;

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
        query.limit = 10;
        query.offset = 10;
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query).then(function(response) {
            $scope.expenditures = response.data;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getExpenditures();
            $scope.status = response.data;
        });
    };

    function getExpenditures() {
        $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
            $scope.expenditures = response.data;
            dataCount = response.data.length();
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
            $scope.status = response.data;
        });
    }

    $scope.getExpendituresSecured = function() {
        $http.get(BASE_API + "/secure/expenditures", {
            headers: { "user": $scope.user, "pass": $scope.pass }
        }).then(function(response) {
            $scope.expenditures = response.data;
            $scope.status = "Authorized";
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
            $scope.status = response.data;
        });
    };

    $scope.getPage = function(p) {
        offsetP = offsetP + p;
        console.log(offsetP);
        if (offsetP < 0) {
            $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
                $scope.expenditures = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.expenditures = [];
            });
        }
        else if (false) {
            $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
                $scope.expenditures = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.expenditures = [];
            });
        }
        else {
            $http.get(BASE_API_PATH_LIMIT + "&offset=" + offsetP).then(function(response) {
                $scope.expenditures = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.expenditures = [];
            });
        }
    };
    getExpenditures();
}]);
