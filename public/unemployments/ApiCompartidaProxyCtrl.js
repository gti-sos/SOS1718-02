/*global angular*/ /*global Highcharts*/
angular.module("App").controller("ApiCompartidaProxyCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var degrees = [];
    var enrolleds = [];
    var firstsecondcycles = [];
    var masters = [];
    var sumaDegrees;
    var sumaEnrolleds;
    var sumaFsc;
    var sumaMasters;

    var youngs = [];
    var adults = [];
    var longterms = [];
    var olds = [];
    var sumaYoung;
    var sumaAdult;
    var sumaLongterm;
    var sumaOld;

    $http.get("/proxyG09/api/v2/span-univ-stats").then(function(response) {
        degrees = response.data.map(function(d) { return d.degree });
        enrolleds = response.data.map(function(d) { return d.enrolledNumber });
        firstsecondcycles = response.data.map(function(d) { return d.firstSecondCycle });
        masters = response.data.map(function(d) { return d.master });

        sumaDegrees = degrees.reduce(function(prev, next) { return prev + next }, 0);
        sumaEnrolleds = enrolleds.reduce(function(prev, next) { return prev + next }, 0);
        sumaFsc = firstsecondcycles.reduce(function(prev, next) { return prev + next }, 0);
        sumaMasters = masters.reduce(function(prev, next) { return prev + next }, 0);
        $http.get("/api/v1/unemployments").then(function(response) {
            console.log(response.data);
            youngs = response.data.map(function(d) { return d.young });
            adults = response.data.map(function(d) { return d.adult });
            longterms = response.data.map(function(d) { return d.longterm });
            olds = response.data.map(function(d) { return d.old });

            sumaYoung = youngs.reduce(function(prev, next) { return prev + next }, 0);
            sumaAdult = adults.reduce(function(prev, next) { return prev + next }, 0);
            sumaLongterm = longterms.reduce(function(prev, next) { return prev + next }, 0);
            sumaOld = olds.reduce(function(prev, next) { return prev + next }, 0);
            Highcharts.chart('container', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Contents of Highsoft\'s weekly fruit delivery'
                },
                subtitle: {
                    text: '3D donut in Highcharts'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Apis Integration',
                    data: [
                        ['Degrees', sumaDegrees],
                        ['Enrolleds', sumaEnrolleds/1000],
                        ['First Second Cycle', sumaFsc],
                        ['Masters', sumaMasters],
                        ['Young', sumaYoung],
                        ['Adult', sumaAdult],
                        ['Long Term', sumaLongterm],
                        ['Old', sumaOld]
                    ]
                }]
            });
        });
    });
}]);
