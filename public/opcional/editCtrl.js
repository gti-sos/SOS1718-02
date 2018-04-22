/* global angular */
angular.module("App").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/expenditures/" + $routeParams.country + "/" + $routeParams.year;

    var BASE_API_PATH_2 = "/api/v2/employments/" + $routeParams.country + "/" + $routeParams.year;

    var BASE_API_PATH_3 = "/api/v1/unemployments/" + $routeParams.country + "/" + $routeParams.year;


    $http.get(BASE_API_PATH_2).then(function(response) {
        $scope.data = response.data;

    });
    $scope.updateEmployment = function() {
        $http.put(BASE_API_PATH_2, $scope.data).then(function(response) {
            $location.path("/");
        });
    };
    $http.get(BASE_API_PATH).then(function(response) {
        $scope.data = response.data;
    });

    $scope.updateExpenditure = function() {
        $http.put(BASE_API_PATH, $scope.data).then(function(response) {
            $location.path("/");
        });
    };
    $http.get(BASE_API_PATH_3).then(function(response) {
        $scope.data = response.data;

    });
    $scope.updateUnemployment = function() {
        $http.put(BASE_API_PATH_3, $scope.data).then(function(response) {
            $location.path("/");
        });
    };
}]);
