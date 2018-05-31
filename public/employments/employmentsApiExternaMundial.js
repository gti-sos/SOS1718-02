/*global angular,Highcharts,google*/
angular.module("App").
controller("employmentsApiExternaMundial", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var dato = []

    var mashape = {
        method: 'GET',
        url: "https://montanaflynn-fifa-world-cup.p.mashape.com/goals",
        headers: {
            "X-Mashape-Key": "mT9OwhUmQ9msh8LFtG9PR0SIcgyap1XFrvbjsnsOqv0C5MqTmT",
            "Accept": "application/json",
            "Accepts": "json"
        }
    };


    $http(mashape).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            dato.push([(response.data[i].game_id).toString(), (response.data[i].minute).toString(), 1])
        }


        console.log(dato);

        google.charts.load('current', { 'packages': ['sankey'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Game');
            data.addColumn('string', 'Minute of goal');
            data.addColumn('number', ' goal');
            data.addRows([
                dato[0], dato[1], dato[2], dato[3], dato[4], dato[5], dato[6], dato[7], dato[8], dato[9], dato[10], dato[11], dato[12], dato[13], dato[14], dato[15], dato[16],
                dato[17], dato[18], dato[19], dato[20], dato[21], dato[22], dato[23], dato[24], dato[25], dato[26], dato[27], dato[28], dato[29], dato[30], dato[31], dato[32], dato[33]
            ]);

            // Sets chart options.
            var options = {
                width: 600,
            };

            // Instantiates and draws our chart, passing in some options.
            var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
            chart.draw(data, options);
        }
    });
}]);
