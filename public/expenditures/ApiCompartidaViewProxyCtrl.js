/*global angular*/ /*global Highcharts*/ /*global $*/
var cities = [];
var allcountriesExp = [];
var uniqueCountriesExp = [];
var bothCountries = [];
var CandYtert = [];
var tertieries = [];
var peakpowers = [];
var warnings = [];
var allCountries = [];
angular.module("App").controller("ApiCompartidaViewProxyCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("/proxyG03/api/v1/global-warmings").then(function(response) {
        cities = response.data.map(function(d) { return d.name + " " + d.year });
        peakpowers = response.data.map(function(d) { return d.peakPower });
        //warnings = cities.map(function(n, i) { return [n, peakpowers[i]]; });
        //console.log(warnings);
        $http.get("/api/v2/expenditures").then(function(response) {
            allcountriesExp = response.data.map(function(d) { return d.country + " " + d.year });
            tertieries = response.data.map(function(d) { return d.tertiery });
            //allCountries = allcountriesExp.map(function(n, i) { return [n, tertieries[i]]; });
            //console.log(allCountries);
            //console.log(response.data);
            //$.each(allcountriesExp, function(i, el) {
            //    if ($.inArray(el, uniqueCountriesExp) === -1) uniqueCountriesExp.push(el);
            //});
            bothCountries = peakpowers.concat(tertieries);
            console.log(bothCountries);
            //console.log(bothCountries);
            // CandYtert = bothCountries.map(function(n, i) { return [n, tertieries[i]]; });
            //console.log(CandYtert);


            //3D Columns
            // Set up the chart
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Expenditures + Warnings'
                },
                subtitle: {
                    text: 'Test options by dragging the sliders below'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                series: [{
                    data: bothCountries
                }]
            });

            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }

            // Activate the sliders
            $('#sliders input').on('input change', function() {
                chart.options.chart.options3d[this.id] = parseFloat(this.value);
                showValues();
                chart.redraw(false);
            });

            showValues();
        });
    });
}]);
