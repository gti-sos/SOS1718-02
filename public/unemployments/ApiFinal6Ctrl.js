/* global angular */ /* global google */
angular.module("App").controller("ApiFinal6Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var characters2 = [];
    var characters3 = [];
    var unemployments = [];
    var phrase = [];
    var final = [];
    $http.get("/proxyAlpha", ).then(function(response) {
        var alphas = response.data.RestResponse.result;
        $http.get("/api/v1/unemployments", ).then(function(response) {
            unemployments = response.data;
            for (var i = 0; i < unemployments.length; i++) {
                for (var j = 0; j < alphas.length; j++) {
                    if (unemployments[i].country == alphas[j].name.toLowerCase()) {
                        characters2.push(alphas[j].alpha2_code);
                        characters3.push(alphas[j].alpha3_code);
                        break;
                    }
                }
            }
            phrase = unemployments.map(function(n, i) {
                return {
                    data: ["Country " + unemployments[i].country + " " + unemployments[i].year + ": " + unemployments[i].longterm + " longterm characters2:" + characters2[i] + ", characters3:" + characters3[i]]
                };
            });

            for (var i = 0; i < phrase.length; i++) {
                final.push(phrase[i].data);
            }

            google.charts.load('current', { packages: ['wordtree'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(
                    final
                );

                var options = {
                    wordtree: {
                        format: 'implicit',
                        word: 'country',
                        width: 1
                    }
                };

                var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
                chart.draw(data, options);
            }
            //console.log(characters2 + " ; " + characters3);
        });

    });
}]);
