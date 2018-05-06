/*global angular,Highcharts,google*/

angular.module("App").
controller("EmploymentsView", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var BASE_API_PATH = "/api/v2/employments";

    $http.get(BASE_API_PATH).then(function(response) {
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Total Self-Employed'
            },

            xAxis: {
                categories: response.data.map(function(r) { return (r.country + " " + r.year) }),
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {

            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },

            series: [{
                name: 'Self-Employed',
                data: response.data.map(function(r) { return (parseFloat(r.totalself)) })
            }]
        });
    })

    $http.get(BASE_API_PATH).then(function(response) {

        google.charts.load('current', {
            'packages': ['geochart'],

        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                
               
                ['Country', 'Salaried in 2000'],
                ['France', parseFloat(response.data.filter(r=>r.country=="france"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Cyprus', parseFloat(response.data.filter(r=>r.country=="cyprus"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Romania', parseFloat(response.data.filter(r=>r.country=="romania"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Spain', parseFloat(response.data.filter(r=>r.country=="spain"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Portugal', parseFloat(response.data.filter(r=>r.country=="portugal"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Italy', parseFloat(response.data.filter(r=>r.country=="italy"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Austria', parseFloat(response.data.filter(r=>r.country=="austria"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))],
                ['Croatia', parseFloat(response.data.filter(r=>r.country=="croatia"&&r.year==2000).map(function(d){return (parseFloat(d.totalsalaried))}))]
         
                  
            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    })

    $http.get(BASE_API_PATH).then(function(response) {
        var lineDiv = document.getElementById('plt');
        var x = [];
        var y = [];
        var w = [];
        var z = [];
        for (var i = 0; i < response.data.length; i++) {
            x.push(response.data[i].country + " " + response.data[i].year);
            y.push(response.data[i].totalself);
            w.push(response.data[i].totalsalaried);
            z.push(response.data[i].totalcontributingfamilyworker);
        }
        var trace1 = {
            x: x,
            y: y,
            type: 'bar',
            text: "totalself",
            textposition: 'auto',
            hoverinfo: 'none',
            opacity: 0.5,
            marker: {
                color: 'rgb(158,202,225)',
                line: {
                    color: 'rbg(8,48,107)',
                    width: 2
                }
            }
        };

        var trace2 = {
            x: x,
            y: w,
            type: 'bar',
            text: "totalsalaried",
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                    color: 'rbg(8,48,107)',
                    width: 2
                }
            }
        };
          var trace3 = {
            x: x,
            y: z,
            type: 'bar',
            text: "totalcontributingfamilyworker",
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                    color: 'rbg(8,48,107)',
                    width: 2
                }
            }
        };


        var data = [trace1, trace2,trace3];

        var layout = {
            title: 'Employments Data from 1998 to 2005'
        };

        Plotly.newPlot(lineDiv, data, layout);
    })
}]);
