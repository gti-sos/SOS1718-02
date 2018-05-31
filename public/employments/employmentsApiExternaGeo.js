/*global angular*/
angular.module("App").
controller("employmentsApiExternaGeo", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var urll = [];
    var nombreC = [];
    var nombreCity = [];
    var typeC = 0;
    var typeCity = 0;

    $scope.searchPlace = function() {
        urll = "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=" + $scope.widget;
        a(urll);
        typeC = 0;
        typeCity = 0;
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
            console.log(response.data)
            for (var i = 0; i < response.data.Results.length; i++) {
                if (response.data.Results[i].type == "country") {
                    typeC = typeC + 1;

                    nombreC.push(response.data.Results[i].name);
                }
                else {
                    typeCity = typeCity + 1;

                    nombreCity.push(response.data.Results[i].name);
                }
            }
            console.log(typeC, typeCity)
            var lineDiv = document.getElementById('plt');



            var data = [{
                values: [typeC, typeCity],
                labels: ['Countries with this name', 'Cyties with this name'],
                type: 'pie'
            }];

            Plotly.newPlot(lineDiv, data);

        });





    }


}]);
