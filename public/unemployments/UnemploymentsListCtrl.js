/* global angular */
angular.module("App").controller("UnemploymentsListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API = "/api/v1";
    var BASE_API_PATH = "/api/v1/unemployments";
    var BASE_API_PATH_LIMIT = "/api/v1/unemployments?&limit=10";
    var dataCount = 0;

    $scope.offsetP = 0;
    $scope.hasNextPage = true;

    $scope.addUnemployment = function() {
        $http.post(BASE_API_PATH, $scope.newUnemployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getUnemployments();
        }, function errorCallback(response) {
            console.log("Bad request");
            window.alert("Bad request");
             $scope.status("Bad request");
        });
    };

    $scope.deleteUnemployment = function(country, year) {
        $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newUnemployment)
            .then(function(response) {
                $scope.status = response.data;
                getUnemployments();
                window.alert(response.data);
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH).then(function(response) {
            $scope.status = response.data;
            getUnemployments();
            window.alert(response.data);
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
        query.limit = 10;
        query.offset = 10;
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query).then(function(response) {
            $scope.unemployments = response.data;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getUnemployments();
            $scope.status = response.data;
            window.alert(response.data);
        });
    };

    function getUnemployments() {
        $http.get(BASE_API_PATH).then(function(response) {
            $scope.unemployments = response.data;
            dataCount = response.data.length;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
            $scope.status = response.data;
        });
    }

    $scope.getUnemploymentsSecured = function() {
        $http.get(BASE_API + "/secure/unemployments", {
            headers: { "user": $scope.user, "pass": $scope.pass }
        }).then(function(response) {
            $scope.unemployments = response.data;
            $scope.status = response.data;
            window.alert(response.data);
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
            $scope.status = response.data;
            window.alert(response.data);
        });
    };

    $scope.getPage = function(p) {
        $scope.offsetP = $scope.offsetP + p;
        console.log($scope.offsetP);
        $http.get(BASE_API_PATH_LIMIT + "&offset=" + $scope.offsetP).then(function(response) {
            $scope.unemployments = response.data;
            $scope.hasNextPage = response.data.length >= p;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
            console.log("Not found");
        });
    };
    getUnemployments();
}]);
