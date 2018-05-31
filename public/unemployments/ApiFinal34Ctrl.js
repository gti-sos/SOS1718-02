/* global angular */

angular.module("App").controller("ApiFinal34Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    //Love Calculator
        $scope.fname = "";
        $scope.sname = "";
        $scope.love;

        $scope.getLove = function() {
            $http.get("https://love-calculator.p.mashape.com/getPercentage?fname=" + $scope.fname + "&sname=" + $scope.sname, {
                    headers: {
                        "X-Mashape-Key": "dOQ9DENKD1mshNLlGRZAlIV2wUSDp1c6D6pjsnDHrByhdo1mqW"
                    }
            }).then(function(response) {
                $scope.love = response.data;
                console.log($scope.love);
            });
        };

        //Robohash Image Generator
            $scope.roboText = "";
            $scope.robot;

             $scope.getRobot = function() {
                $http.get("https://robohash.p.mashape.com/index.php?text=" + $scope.roboText, {
                        headers: {
                            "X-Mashape-Key": "dOQ9DENKD1mshNLlGRZAlIV2wUSDp1c6D6pjsnDHrByhdo1mqW"
                        }
                }).then(function(response) {
                    $scope.robot = response.data;
                    console.log($scope.robot.imageUrl);
                });
            };

}]);