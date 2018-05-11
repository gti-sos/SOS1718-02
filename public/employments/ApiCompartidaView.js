/*global angular,Highcharts,google*/
angular.module("App").
controller("ApiCompartidaView", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var dataCountries = [];
    var dataTotalSelf = [];
    var dataKills = [];

    $http.get("https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataCountries.push(response.data[i].country_txt + " " + response.data[i].iyear);
        }
    });
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataCountries.push(response.data[i].country + " " + response.data[i].year);
        }
    });

    $http.get("https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataTotalSelf.push(0);
        }
    });
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataTotalSelf.push(response.data[i].totalself);
        }
    });

    $http.get("https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataKills.push(response.data[i].nkill);
        }
    });
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dataKills.push(0);
        }
        Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: "Relation between Self-employments and Kills in terrorism's acts"
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 1500,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: dataCountries,

            },

            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Total Self Employments',
                data: dataTotalSelf
            }, {
                name: 'Total kills',
                data: dataKills
            }]
        });
    });

    console.log(dataCountries, dataTotalSelf, dataKills);






}]);
