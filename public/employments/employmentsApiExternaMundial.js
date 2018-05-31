/*global angular,Highcharts,google*/
angular.module("App").
controller("employmentsApiExternaMundial", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var minute=[];var game=[];
    
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
            minute.push(response.data[i].minute);
            game.push(response.data[i].game_id);
        }
    });

    console.log(game);

    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Minute of goal');
        data.addColumn('string', 'Game');
         console.log(game);
        
            //data.addRow([   for (var i = 0; i < minute.length; i++) {    [{ v: minute[i], f: game[i] }]       }       ]);
        
        data.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);
        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
    }

}]);
