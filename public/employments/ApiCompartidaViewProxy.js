/*global angular,app,request,Highcharts*/
var apiEXT = "proxyJA/api/v1/divorces-an"
angular.module("App").controller("ApiCompartidaViewProxy", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  
    var totalcontributingfamilyworkerData = [];
    var CounProv = [];
    var divorces = [];
    
    $http.get(apiEXT).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            CounProv.push(response.data[i].province+" "+response.data[i].year);
        }
    });
    
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            CounProv.push(response.data[i].country+" "+response.data[i].year);
        }
    });
    $http.get(apiEXT).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            totalcontributingfamilyworkerData.push(0);
        }
    });
     $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            totalcontributingfamilyworkerData.push(response.data[i].totalcontributingfamilyworker);
        }
    });
    
    $http.get(apiEXT).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            divorces.push(response.data[i].divorce);
        }
    });
     $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
           divorces.push(0);
        }
    });
   
   
    $http.get(apiEXT).then(function(response) {
        console.log(response.data);

        Highcharts.chart('container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Relation between Contributing Family Worker and Divorces'
            },
            xAxis: [{
                categories: CounProv,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Divorces',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Contributing',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [{
                name: 'Contributing',
                type: 'column',
                yAxis: 1,
                data: totalcontributingfamilyworkerData,
               

            }, {
                name: 'Divorces',
                type: 'spline',
                data: divorces,
                
            }]
        });
    })


}]);
