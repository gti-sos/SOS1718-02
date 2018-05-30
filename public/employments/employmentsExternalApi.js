/*global angular,Highcharts,google*/
angular.module("App").
controller("employmentsExternalApi", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var Countries = [];
    var Area = [];
    var Population = [];
    var totalself = [];

    $http.get("https://restcountries.eu/rest/v2/region/europe").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            Countries.push(response.data[i].name);
            Area.push(response.data[i].area);
            Population.push(response.data[i].population);
            totalself.push(0);

        }
    });

    console.log(Countries, Area, Population);
    
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            Countries.push(response.data[i].country);
            totalself.push(response.data[i].totalself);
            Area.push(0);
            Population.push(0);

        }

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Total Self, Area and Population'
            },

            xAxis: {
                categories: Countries
            },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Total Self',
                data: totalself
            }, {
                name: 'Area',
                data: Area
            }, {
                name: 'Population',
                data: Population
            }]
        });
    });
}]);
