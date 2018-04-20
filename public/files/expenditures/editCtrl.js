/* global angular */

angular.module("ExpendituresApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/expenditures/" + $routeParams.country + "/" + $routeParams.year;

    $http.get(BASE_API_PATH).then(function(response) {
        $scope.data = response.data;
    });

    $scope.updateExpenditure = function() {
        $http.put(BASE_API_PATH, $scope.data).then(function(response) {
            $scope.status = "Status: " + response.status;
            $location.path("/");
        });
    };
}]);
