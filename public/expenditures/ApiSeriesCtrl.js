/* global angular */ /* global Chart */
angular.module("App").controller("ApiSeriesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var temporadas = [];
    var capitulos = [];
    var series = [];
    $http.get("/proxySeries").then(function(response) {
        temporadas = response.data.map(function(d) { return d.Temporada });
        capitulos = response.data.map(function(d) { return d.Capitulo });
        series = response.data.map(function(d) { return d.Nombre });
        var options = {
            type: 'line',
            data: {
                labels: series,
                datasets: [{
                        label: '# of seasons',
                        data: temporadas,
                        borderWidth: 1
                    },
                    {
                        label: '# of chapters',
                        data: capitulos,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            reverse: false
                        }
                    }]
                }
            }
        };

        var ctx = document.getElementById('chartJSContainer').getContext('2d');
        new Chart(ctx, options);
    });
}]);
