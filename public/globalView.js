/*global angular,Highcharts,google*/
angular.module("App").
controller("GlobalView", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var Coun = [];
    var EmpTC = [];
    var EmpTS = [];
    var EmpTSe = [];

    
    var UnempY = [];
    var UnempA = [];
    var UnempO = [];
    var UnempL = [];

    
    var expP = [];
    var expS = [];
    var expT = [];


    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            Coun.push(response.data[i].country + " " + response.data[i].year);
            EmpTC.push(response.data[i].totalcontributingfamilyworker);
            EmpTS.push(response.data[i].totalsalaried);
            EmpTSe.push(response.data[i].totalself);
            UnempY.push(0);UnempA.push(0);UnempO.push(0);UnempL.push(0);
            expP.push(0);expS.push(0);expT.push(0);
        }
    });
    $http.get("https://sos1718-02.herokuapp.com/api/v1/unemployments").then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            Coun.push(response.data[i].country + " " + response.data[i].year);
            UnempY.push(response.data[i].young);
            UnempA.push(response.data[i].adult);
            UnempO.push(response.data[i].old);
            UnempL.push(response.data[i].longterm);
            
            EmpTC.push(0);EmpTS.push(0);EmpTSe.push(0);
            expP.push(0);expS.push(0);expT.push(0);
        }
    });

    $http.get("https://sos1718-02.herokuapp.com/api/v2/expenditures").then(function(response) {
     for (var i = 0; i < response.data.length; i++) {
            Coun.push(response.data[i].country + " " + response.data[i].year);
            expP.push(response.data[i].primary);
            expS.push(response.data[i].secondary);
            expT.push(response.data[i].tertiery);
              EmpTC.push(0);EmpTS.push(0);EmpTSe.push(0);
              UnempY.push(0);UnempA.push(0);UnempO.push(0);UnempL.push(0);
        }
        console.log(Coun);
        Highcharts.chart('container', {
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: 'Relation between employments,unemployments and expeditures'
            },
           
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories:Coun},
            yAxis: {
                title: {
                    text: 'Y-Axis'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total Self',
                data: EmpTSe
            },{
                name: 'Total Salaried',
                data: EmpTS
            },{
                name: 'Total Contributing Family Worker',
                data: EmpTC
            }, 
            {
                name: 'Young',
                data: UnempY
            },{
                name: 'Adult',
                data: UnempA
            },{
                name: 'Old',
                data: UnempO
            },{
                name: 'Longterm',
                data: UnempL
            },
            
            {
                name: 'Primary',
                data: expP
            },{
                name: 'Secondary',
                data: expS
            },{
                name: 'Tertiary',
                data: expT
            }]
        });
    });
}]);
