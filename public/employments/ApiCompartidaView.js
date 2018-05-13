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
                type: 'column'
            },
            title: {
                text: 'Relation between kills and Self-employments'
            },
           
            xAxis: {
                categories: dataCountries,
                crosshair: true
            },
            
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Kills',
                data: dataKills

            }, {
                name: 'Self-employments',
                data: dataTotalSelf

            }]
        });
    });

    console.log(dataCountries, dataTotalSelf, dataKills);






}]);
