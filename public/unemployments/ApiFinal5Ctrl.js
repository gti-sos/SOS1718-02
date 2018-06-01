/* global angular */ /* global google */ /* global $ */
angular.module("App").controller("ApiFinal5Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("/api/v1/unemployments").then(function(response) {
        var uniqueCountries = [];
        var amountC = response.data.length;
        var countries = [];
        for (var i = 0; i < amountC; i++) {
            countries[i] = response.data[i].country;
        }
        $.each(countries, function(i, el) {
            if ($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
        });
        $scope.uniques = uniqueCountries;
        console.log(uniqueCountries);
    });

    $scope.universities = function(nombre) {
        console.log(nombre);
        $http.get("/api/v1/unemployments?country=" + nombre).then(function(response) {
            var unemployments = response.data;
            console.log(unemployments);
            $http.get("/proxyUniversities/search?country=" + nombre).then(function(response) {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Country', 'Young', 'Adult', 'Old', 'Longterm', 'Amount of universities'],
                        [unemployments[0].country, unemployments[0].young, unemployments[0].adult, unemployments[0].old, unemployments[0].longterm, response.data.length],
                    ]);
                    var options = {
                        title: 'Universities of Europe',
                        vAxis: { title: 'Accumulated Values' },
                        isStacked: true
                    };
                    var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }
            });
        });
    };
}]);
