/*global angular*/
angular.module("App").controller("ApiFinal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://api.instagram.com/v1/users/self/?access_token=3159425969.27140bc.a71bad15137c436981829814ce633574").then(function(response) {
        console.log(response.data);
        $scope.data = "Usuario: " + response.data.data.full_name + " Id: " + response.data.data.id;
    });
}]);
