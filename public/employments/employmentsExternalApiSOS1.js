/*global angular,Highcharts,google*/

angular.module("App").
controller("employmentsExternalApiSOS1", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var country = [];
    var totalsalaried = [];
    var rank = [];

    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < 4; i++) {
            country.push(response.data[i].country);
            totalsalaried.push(response.data[i].totalsalaried);
            rank.push(0);

        }

        $http.get("https://sos1718-05.herokuapp.com/api/v1/country-stats").then(function(response) {
            for (var i = 0; i < 4; i++) {
                country.push(response.data[i].country);
                totalsalaried.push(0);
                rank.push(response.data[i].rank);

            }

            console.log(country, totalsalaried, rank)


            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                
                title: {
                   
                    horizontalAlign: "left"
                },
                data: [{
                    type: "doughnut",
                    startAngle: 60,
                    //innerRadius: 60,
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                    toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                    dataPoints: [
                        { y: rank[0], label: country[0]+" "+totalsalaried[0] },
                        { y: rank[1], label: country[1]+" "+totalsalaried[1]},
                        { y: rank[2], label: country[2]+" "+totalsalaried[2] },
                        { y: rank[3], label: country[3]+" "+totalsalaried[3] },
                        { y: rank[4], label: country[4]+" "+totalsalaried[4] },
                        { y: rank[5], label: country[5]+" "+totalsalaried[5] },
                        { y: rank[6], label: country[6]+" "+totalsalaried[6] },
                        { y: rank[7], label: country[7]+" "+totalsalaried[7] }
                    ]
                }]
            });
            chart.render();
        })
    })








}])
