/* global angular */ /* global google */
angular.module("App").controller("ApiWeatherCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var amountC; //Cantidad de datos Population
    var countries = [];
    var uniqueCountries = [];

    $http.get("/api/v2/expenditures").then(function(response) {
        amountC = response.data.length;
        for (var i = 0; i < amountC; i++) {
            countries[i] = response.data[i].country;
        }

        $.each(countries, function(i, el) {
            if ($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
        });

        $scope.uniques = uniqueCountries;
    });

    $scope.weather = function(nombre) {
        //console.log(nombre);
        $http.get("/proxyWeather", { headers: { "city": nombre } }).then(function(response) {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Country', 'Actual weather'],
                    ['Humidity', response.data.main.humidity],
                    ['Pressure', response.data.main.pressure],
                    ['Temp', response.data.main.temp],
                    ['Temp min', response.data.main.temp_min],
                    ['Temp max', response.data.main.temp_max]
                ]);
                var options = {
                    title: 'Weathers'
                };
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }
        });
    };
}]);
