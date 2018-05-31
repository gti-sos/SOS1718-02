/*global angular*/
angular.module("App").controller("ApiFinal1Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var token = "3159425969.27140bc.a71bad15137c436981829814ce633574";
    $http.get("https://api.instagram.com/v1/users/self/?access_token=" + token).then(function(response) {
        console.log(response.data);
        $scope.data = "Usuario: " + response.data.data.full_name + "\nId: " + response.data.data.id;
    });
}]);
