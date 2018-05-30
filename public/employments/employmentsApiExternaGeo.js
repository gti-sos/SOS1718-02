/*global angular*/
angular.module("App").
controller("employmentsApiExternaGeo", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var urll = [];
    var nombre=[];
    var type=[];
    
    $scope.searchPlace = function() {
        urll = "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=" + $scope.widget;
        a(urll);
    };

    function a(url) {
        var mashape = {
            method: 'GET',
            url: url,
            headers: {
                "X-Mashape-Key": "mT9OwhUmQ9msh8LFtG9PR0SIcgyap1XFrvbjsnsOqv0C5MqTmT",
                "Accept": "application/json",
                "Accepts": "json"
            }
        };
        b(mashape);
    }

    function b(mashape) {
        $http(mashape).then(function(response) {
            for(var i=0;i<response.data.Results.length;i++){
                nombre.push(response.data.Results[i].name);
                type.push(response.data.Results[i].type);
            }
        });
    }


}]);
