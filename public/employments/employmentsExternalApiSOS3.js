/*global angular,app,zingchart,Highcharts*/
angular.module("App").
controller("employmentsExternalApiSOS3", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var datos = []
    var n = [];


    $http.get("https://sos1718-06.herokuapp.com/api/v1/budgets-laws").then(function(response) {
        for (var i = 0; i < 5; i++) {
            datos.push(response.data[i].budgetofcapital);
            n.push(response.data[i].section);

        }
        console.log(datos.sort())




        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Budget of capital in Andalucia in year 2017"
            },
            data: [{
                type: "pyramid",
                toolTipContent: "<b>{label}</b>: {y}%",
                indexLabelFontColor: "#5A5757",
                indexLabelFontSize: 16,
                indexLabel: "{label}({y}%)",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: datos[0], label: n[0] },
                    { y: datos[2], label: n[2] },
                    { y: datos[1], label: n[1] },
                    { y: datos[3], label: n[3] },
                    { y: datos[4], label: n[4] }
                ]
            }]
        });
        chart.render();



    });

}]);
