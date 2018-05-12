/*global angular*//*global Highcharts*/
angular.module("App").controller("ApiCompartidaViewCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("https://sos1718-09.herokuapp.com/api/v1/spanish-universities").then(function(response) {
        console.log(response.data);
    });
    Highcharts.chart('container', {
        chart: {
            type: 'column'
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
            data: [1, 3, 2, 4]
        }, {
            data: [324, 124, 547, 221],
            yAxis: 1
        }]
    });
}]);
