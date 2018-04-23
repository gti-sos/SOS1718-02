/* global angular */
angular.module("UnemploymentsApp").
controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/unemployments/" + $routeParams.country + "/" + $routeParams.year;
    $http.get(BASE_API_PATH).then(function(response) {
        $scope.data = response.data;
    });

    $scope.updateUnemployment = function() {
        $http.put(BASE_API_PATH, $scope.data).then(function(response) {
                        window.alert("update!!!");

            $location.path("/");
        });
    };
}]);
