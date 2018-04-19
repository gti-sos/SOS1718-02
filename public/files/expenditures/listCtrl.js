/* global angular */

angular.module("ExpendituresApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v1/expenditures";

    function getExpenditures() {
        $http.get(BASE_API_PATH).then(function(response) {
            $scope.expenditures = response.data;
        });
    }
    getExpenditures();
}]);