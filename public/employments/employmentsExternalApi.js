/*global angular,Highcharts,google*/
angular.module("App").
controller("employmentsExternalApi", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var dato = [];
    $http.get("https://restcountries.eu/rest/v2/region/europe").then(function(response) {
        for (var i = 0; i < 5; i++) {
            dato.push([response.data[i].name, 0, response.data[i].population])

        }
        console.log(dato);
    });


    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < 5; i++) {

            dato.push([response.data[i].country,  response.data[i].totalself,0])

        }console.log(dato)
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawSeriesChart);

        function drawSeriesChart() {

            var data = google.visualization.arrayToDataTable([
                ['Country', 'Total Self', 'Population'],
                  dato[0],dato[1],dato[2],dato[3],dato[4],dato[5],dato[6],dato[7],dato[8],dato[9],dato[10],dato[11],dato[12],dato[13],dato[14],dato[15],dato[dato.length-1],dato[dato.length-2],dato[dato.length-3]
            ]);

            var options = {
                hAxis: { title: 'Self employment' },
                vAxis: { title: 'Population' },
                bubble: { textStyle: { fontSize: 11 } }
            };

            var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
            chart.draw(data, options);
        }

    });
}]);
