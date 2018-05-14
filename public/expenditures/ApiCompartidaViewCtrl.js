/*global angular*/ /*global Highcharts*/
angular.module("App").controller("ApiCompartidaViewCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var football = [];
    var expenditures = [];

    $http.get("https://sos1718-11.herokuapp.com/api/v2/secure/football-stats" + "?apikey=scraping").then(function(response) {
        console.log(response.data);
        football = response.data.map(function(d) { return d.corner });
        $http.get("/api/v2/expenditures").then(function(response) {
            console.log(response.data);
            expenditures = response.data.map(function(d) { return d.primary });
            Highcharts.chart('container', {
                chart: {
                    type: 'bars'
                },

                title: {
                    text: 'Styling axes and columns'
                },

                yAxis: [{
                    className: 'highcharts-color-0',
                    title: {
                        text: 'Primary axis'
                    }
                }, {
                    className: 'highcharts-color-1',
                    opposite: true,
                    title: {
                        text: 'Secondary axis'
                    }
                }],

                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },

                series: [{
                    data: expenditures
                }, {
                    data: football,
                    yAxis: 1
                }]
            });
        });
    });

}]);
