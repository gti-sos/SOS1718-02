/*global angular,app,zingchart,Highcharts*/
angular.module("App").
controller("employmentsExternalApiSOS2", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var country = [];
    var totalsalaried = [];
    var bed = [];
    $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
        for (var i = 0; i < 3; i++) {
            country.push(response.data[i].country);
            totalsalaried.push(response.data[i].totalsalaried);
            bed.push(0);

        }
        console.log(country, totalsalaried, bed)
        $http.get("https://sos1718-12.herokuapp.com/api/v1/hospital-stats").then(function(response) {
            for (var i = 0; i < 3; i++) {
                country.push(response.data[i].country);
                totalsalaried.push(0);
                bed.push(response.data[i].bed);

            }
            console.log(country, totalsalaried, bed)



            zingchart.THEME = "classic";
            var myConfig = {
                  "type": "line",
               
                
                "scale-x": {
                    "values": country,
                  
                },
                
                "series": [{
                        
                        "values": bed,
                        
                     
                    },
                    {
                      
                        "values": totalsalaried,
                      
                    },

                ]
            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: 500,
                width: 725
            });

        });
    });
}]);
