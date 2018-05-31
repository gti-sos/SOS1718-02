/*global angular,google,zingchart*/
angular.module("App").
controller("employmentsApiExternaEbola", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var fecha = [];
    var casos = [];
    var muertes = []
    var mashape = {
        method: 'GET',
        url: "https://ebola-outbreak.p.mashape.com/cases",
        headers: {
            "X-Mashape-Key": "mT9OwhUmQ9msh8LFtG9PR0SIcgyap1XFrvbjsnsOqv0C5MqTmT",
            "Accept": "application/json"
        }
    };

    $http(mashape).then(function(response) {
        for (var i = 0; i < response.data.length / 3; i++) {
            fecha.push(response.data[i].date);
            casos.push(response.data[i].cases);
            muertes.push(response.data[i].deaths);

        }
        console.log(fecha,casos, muertes)
        
        zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/"; // set modules dir
        zingchart.loadModules('dragging'); // load dragging module

        var myConfig = { // chart configuration
            type: 'vbullet',
            title: {
                text: 'cases and deads by Ebola'
            },
            
            scaleX: {
                labels: fecha
            },
            tooltip: { // tooltip changes based on value
                fontSize: 1,
                borderRadius: 1,
                borderWidth: 0,
                shadow: true
            },
            plot: {
                valueBox: [{
                    type: 'all',
                    color: '#000',
                    placement: 'goal'
                }]
            },
            series: [{
                dataDragging: true, // need this to enable drag
                values: casos,
                goals: muertes,
                goal: {
                    backgroundColor: '#64b5f6',
                    borderWidth: 0,
                },

            }]
        };

        zingchart.render({
            id: 'myChart',
            data: myConfig,
            height: 500,
            width: '100%',
            modules: "dragging" // need this to enable drag
        });
    });

}]);
