/* global angular */

angular.module("ExpendituresApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/expenditures/" + $routeParams.country + "/" + $routeParams.year;

    $http.get(BASE_API_PATH).then(function(response) {
        $scope.updatedExpenditure = response.data;
    });

    $scope.updateExpenditure = function() {
        $http.put(BASE_API_PATH, $scope.updateExpenditure).then(function(response) {
            console.log($scope.updateExpenditure);
            $scope.status = "Status: " + response.status;
        });
    };
}]);
