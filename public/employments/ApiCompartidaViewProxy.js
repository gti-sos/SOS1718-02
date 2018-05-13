/*global angular,app,request,Highcharts*/
var apiEXT = "proxyJA/api/v1/divorces-an"
angular.module("App").controller("ApiCompartidaViewProxy", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    var data1 = [];
    var data2 = [];

    $http.get(apiEXT).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            data1.push([response.data[i].province + " " + response.data[i].year, response.data[i].divorce]);
            data2.push([response.data[i].province + " " + response.data[i].year, 0]);
        }
        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                data1.push([response.data[i].country + " " + response.data[i].year, 0]);
                data2.push([response.data[i].country + " " + response.data[i].year, response.data[i].totalcontributingfamilyworker]);
            }


        });

        console.log(data1);
        console.log(data2);


    });





    $http.get(apiEXT).then(function(response) {


        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Relation between Contributing family worker and divorces'
            },


            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },

            series: [{
                name: 'Place and divorce',
                color: 'rgba(223, 83, 83, .5)',
                data: data1
            }, {
                name: 'Place and contributing family worker',
                color: 'rgba(22, 83, 83, .80)',
                data: data2
            }]

        });


    });
}]);
