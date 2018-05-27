/* global angular */
angular.module("App").
controller("ExpendituresEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/expenditures/" + $routeParams.country + "/" + $routeParams.year;
    var user = window.localStorage;
    $http.get(BASE_API_PATH).then(function(response) {
        if (user.logged == "true") {
            $scope.data = response.data;
            console.log(response.data.country);
        }
        else {
            window.alert("You are not logged");
        }
    });

    $scope.updateExpenditure = function() {
        if (user.admin == "true") {
            $http.put(BASE_API_PATH, $scope.data).then(function(response) {
                window.alert("Updated!");
                $location.path("/expenditures");
            }, function errorCallback(response) {
                console.log("Bad request");
                window.alert("All fields must be numbers!!");
            });
        }
        else {
            window.alert("Unauthorized");
            $location.path("/expenditures");
        }
    };
}]);
