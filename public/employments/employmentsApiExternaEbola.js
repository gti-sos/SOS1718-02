/*global angular,google*/
angular.module("App").
controller("employmentsApiExternaEbola", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var fecha = [];var casos = [];var muertes = []
    var mashape = {
        method: 'GET',
        url: "https://ebola-outbreak.p.mashape.com/cases",
        headers: {
            "X-Mashape-Key": "mT9OwhUmQ9msh8LFtG9PR0SIcgyap1XFrvbjsnsOqv0C5MqTmT",
            "Accept": "application/json"
        }
    };

    $http(mashape).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            fecha.push(response.data[i].date);
            casos.push(response.data[i].cases);
            muertes.push(response.data[i].deaths);
            
        }
        console.log(casos,muertes)
    });

    /*
        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments/2002").then(function(response) {


            google.charts.load('current', { 'packages': ['table'] });
            google.charts.setOnLoadCallback(drawTable);

            function drawTable() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Country');
                data.addColumn('number', 'Total salaried in 2002');
                data.addColumn('number', 'Average temperature from 1980 to 1999');
                data.addRows([
                    ['Portugal', parseFloat(response.data.filter(r => r.country == "portugal" && r.year == 2002).map(function(d) { return (parseFloat(d.totalsalaried)) })), ]
                ]);

                var table = new google.visualization.Table(document.getElementById('table_div'));

                table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
            }

        });



    */
}]);
