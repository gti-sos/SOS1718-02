/* global angular */ /* global $ */ /* global google */
var uniqueCountries = [];
var amountVat; //Cantidad de datos Vat
var countriesJV = []; //Array ciudades Vat
var vatsJV = []; //Array vat Vat

var amountCP; //Cantidad de datos Population
var countriesCP = []; //Array ciudades population
var populationCP = []; //Array population population

var amountC; //Cantidad mis ciudades
var countries = []; //Array mis ciudades

var commonVats = []; //Array de vats
var commonPopulation = []; //Array de cantidades comunes population

var data1 = [];
var data2 = [];

angular.module("App").controller("ApiFinalCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("/proxyVat").then(function(response) {
        amountVat = response.data.rates.length;
        console.log(response.data);
        for (var i = 0; i < amountVat; i++) {
            countriesJV[i] = response.data.rates[i].name.toLowerCase();
            vatsJV[i] = response.data.rates[i].periods[0].rates.standard;
        }
        $http.get("/proxyPopulation").then(function(response) {
            amountCP = response.data.length;
            for (var i = 0; i < amountCP; i++) {
                countriesCP[i] = response.data[i].name.toLowerCase();
                populationCP[i] = response.data[i].population;
            }
            $http.get("/api/v2/expenditures").then(function(response) {
                amountC = response.data.length;
                for (var i = 0; i < amountC; i++) {
                    countries[i] = response.data[i].country;
                }
                $.each(countries, function(i, el) {
                    if ($.inArray(el, uniqueCountries) === -1) uniqueCountries.push(el);
                });

                for (var i = 0; i < uniqueCountries.length; i++) {
                    for (var j = 0; j < countriesJV.length; j++) {
                        if (uniqueCountries[i] == countriesJV[j]) {
                            commonVats.push(vatsJV[j]);
                        }
                    }
                }
                for (var i = 0; i < uniqueCountries.length; i++) {
                    for (var j = 0; j < countriesCP.length; j++) {
                        if (uniqueCountries[i] == countriesCP[j]) {
                            commonPopulation.push(populationCP[j]);
                        }
                    }
                }

                for (var i = 0; i < uniqueCountries.length; i++) {
                    data1.push(uniqueCountries[i], commonVats[i], commonPopulation[i]);
                    data2.push(data1[i]);
                }
                //console.log(uniqueCountries);
                //console.log(commonVats);
                //console.log(commonPopulation);
                console.log(data2);

                google.charts.load('current', { 'packages': ['table'] });
                google.charts.setOnLoadCallback(drawTable);

                function drawTable() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Name');
                    data.addColumn('number', 'Salary');
                    data.addRows([
                        ['Mike', 10000],
                        ['Jim', 8000],
                        ['Alice', 8000],
                        ['Bob', 8000]
                    ]);
                    //data.addRows(data1);

                    var table = new google.visualization.Table(document.getElementById('table_div'));

                    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
                }
            });
        });
    });
}]);
