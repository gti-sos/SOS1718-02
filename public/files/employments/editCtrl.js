/* global angular */

angular.module("EmploymentsApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/employments/" + $routeParams.country + "/" + $routeParams.year;
    //var app = angular.module('ExpendituresApp', ['bw.paging'])
    $http.get(BASE_API_PATH).then(function(response) {
        $scope.data = response.data;

    });
    $scope.updateEmployment = function() {
        $http.put(BASE_API_PATH, $scope.data).then(function(response) {
            window.alert("Updated!");
            $location.path("/");
        });
    };
}]);
