/*global angular*/ /*global Highcharts*/
angular.module("App").controller("ApiCompartidaCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var youngs = [];
    var adults = [];
    var longterms = [];
    var olds = [];
    var sumaYoung;
    var sumaAdult;
    var sumaLongterm;
    var sumaOld;

    var poles = [];
    var victories = [];
    var sumaPoles;
    var sumaVictories;
    var everything;

    $http.get("https://sos1718-10.herokuapp.com/api/v1/builders").then(function(response) {
        //console.log(response.data);
        poles = response.data.map(function(d) { return d.pole });
        victories = response.data.map(function(d) { return d.victory });
        sumaPoles = poles.reduce(function(prev, next) { return prev + next }, 0);
        sumaVictories = victories.reduce(function(prev, next) { return prev + next }, 0);
        $http.get("/api/v1/unemployments").then(function(response) {
            youngs = response.data.map(function(d) { return d.young });
            adults = response.data.map(function(d) { return d.adult });
            longterms = response.data.map(function(d) { return d.longterm });
            olds = response.data.map(function(d) { return d.old });
            sumaYoung = youngs.reduce(function(prev, next) { return prev + next }, 0);
            sumaAdult = adults.reduce(function(prev, next) { return prev + next }, 0);
            sumaLongterm = longterms.reduce(function(prev, next) { return prev + next }, 0);
            sumaOld = olds.reduce(function(prev, next) { return prev + next }, 0);
            //console.log(sumaYoung, sumaAdult, sumaLongterm, sumaOld);
            //console.log(response.data);
            everything = [sumaAdult, sumaLongterm, sumaOld, sumaPoles, sumaVictories];
            everything.sort(function(a, b){return b-a});
            console.log(everything);

            Highcharts.chart('container', {
                chart: {
                    type: 'pyramid'
                },
                title: {
                    text: 'Sales pyramid',
                    x: -50
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b> ({point.y:,.0f})',
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            softConnector: true
                        },
                        center: ['40%', '50%'],
                        width: '80%'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Unique API',
                    data: everything
                }]
            });
        });
    });



}]);
