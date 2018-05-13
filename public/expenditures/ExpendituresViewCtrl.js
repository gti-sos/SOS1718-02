/* global angular */ /* global Highcharts*/ /* global google*/
angular.module("App").controller("ExpendituresView", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    console.log("ExpendituresView initialized!");
    //var countries = [];
    //var years = [];
    var primaries = [];
    var secundaries = [];
    var tertieries = [];
    var countryyear = [];
    var sumas = [];
    var medias = [];
    var sumaPrimaries;
    var sumaSecundaries;
    var sumaTertieries;
    var CandYsumas = [];

    $http.get("/api/v2/expenditures").then(function(response) {
        //countries = response.data.map(function(d) { return d.country });
        //years = response.data.map(function(d) { return d.year });
        primaries = response.data.map(function(d) { return d.primary }); //Coleccion todas las primaries
        secundaries = response.data.map(function(d) { return d.secundary }); //Coleccion todas las secundaries.
        tertieries = response.data.map(function(d) { return d.tertiery }); //Coleccion todas las tertieries.
        sumas = response.data.map(function(d) { return d.primary + d.secundary + d.tertiery }); //Total de todo.
        medias = sumas.map(function(d) { return d / 3 }); //Media de todo
        sumaPrimaries = primaries.reduce(function(prev, next) { return prev + next }, 0); //Suma Primaries
        sumaSecundaries = secundaries.reduce(function(prev, next) { return prev + next }, 0); //Suma secundaries
        sumaTertieries = tertieries.reduce(function(prev, next) { return prev + next }, 0); //Suma tertieries
        countryyear = response.data.map(function(d) { return d.country + " " + d.year }); //Junta countries con years
        CandYsumas = countryyear.map(function(n, i) { return [n, sumas[i]]; }); //Junta Country year con las sumas del resto.
        CandYsumas.unshift(['Country', 'Expenditures']); //Añade Country and Expenditures al principio.
        console.log(CandYsumas);

        //Highcharts Column, line and pie
        Highcharts.chart('container', {
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: countryyear
            },
            labels: {
                items: [{
                    html: 'Total expenditures',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Primary',
                data: primaries
            }, {
                type: 'column',
                name: 'Secundary',
                data: secundaries
            }, {
                type: 'column',
                name: 'Tertiery',
                data: tertieries
            }, {
                type: 'spline',
                name: 'Average',
                data: medias,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total expenditures',
                data: [{
                    name: 'Primary',
                    y: sumaPrimaries,
                    color: Highcharts.getOptions().colors[0]
                }, {
                    name: 'Secundary',
                    y: sumaSecundaries,
                    color: Highcharts.getOptions().colors[1]
                }, {
                    name: 'Tertiery',
                    y: sumaTertieries,
                    color: Highcharts.getOptions().colors[2]
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });

        //Geochart de GOOGLE
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(
                CandYsumas
            );

            var options = { region: '150' };
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }

        //OTRO
        $scope.labels = countryyear;
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            primaries,
            secundaries,
            tertieries
        ];
    });
}]);
