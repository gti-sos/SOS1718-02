/* global angular */

angular.module("App").controller("FunnyApisCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    //Chuck Norris
        $scope.norris;

        $scope.getNorris = function() {
            $http.get("https://matchilling-chuck-norris-jokes-v1.p.mashape.com/jokes/random", {
                    headers: {
                        "X-Mashape-Key": "Ct017yQKOzmshgTzaOjqqmKHCr5Pp1yMhB9jsnbmSsC5ReNvjh"
                    }
                })
                .then(function(response) {

                    $scope.norris = response.data;
                    console.log($scope.norris);

                });
        };
        
    //Fancy text
        $scope.text = "";
        $scope.fancyText;

        $scope.getFancyText = function() {
            $http.get("https://ajith-Fancy-text-v1.p.mashape.com/text?text=" + $scope.text, {
                    headers: {
                        "X-Mashape-Key": "qv5YlUxt0Gmshuw0NlJlghc15bYPp1tJUUrjsn0E3pzYT2N2Tu"
                    }
                })
                .then(function(response) {

                    $scope.fancyText = response.data;
                    console.log($scope.fancyText);

                });
        };
        
    
}]);