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

var datas = [];
var datas2 = [];

angular.module("App").controller("ApiVatCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("/proxyVat").then(function(response) {
        amountVat = response.data.rates.length;
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
                
                $scope.uniques = uniqueCountries;
                for (var i = 0; i < uniqueCountries.length; i++) { //Array con ivas
                    for (var j = 0; j < countriesJV.length; j++) {
                        if (uniqueCountries[i] == countriesJV[j]) {
                            commonVats.push(vatsJV[j]);
                        }
                    }
                }
                for (var i = 0; i < uniqueCountries.length; i++) { //Array con populations
                    for (var j = 0; j < countriesCP.length; j++) {
                        if (uniqueCountries[i] == countriesCP[j]) {
                            commonPopulation.push(populationCP[j]);
                        }
                    }
                }

                datas = uniqueCountries.map(function(n, i) {
                    return {
                        data: [uniqueCountries[i], commonVats[i], commonPopulation[i]]
                    };
                });

                for (var i = 0; i < datas.length; i++) {
                    datas2.push(datas[i].data);
                }
                google.charts.load('current', { 'packages': ['table'] });
                google.charts.setOnLoadCallback(drawTable);

                function drawTable() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Name');
                    data.addColumn('number', 'VAT');
                    data.addColumn('number', 'Population');
                    data.addRows(datas2);
                    var table = new google.visualization.Table(document.getElementById('table_div'));
                    table.draw(data, { showRowNumber: false, width: '100%', height: '100%' });
                }
            });
        });
    });
}]);
