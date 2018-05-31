/*global angular*/
angular.module("App").controller("ApiFinal2Ctrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var token ="AIzaSyCEgGZg5pg2vAZA7QLAg3e9gcNrIJ_Cw_Q";
    var dir ="Escuela+Técnica+superior+de+Ingeniería+Informática,+ETSII+sevilla";
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+dir+"&key="+token).then(function(response) {
        var sitio = response.data.results[0].formatted_address;
        var lat= response.data.results[0].geometry.location.lat;
        var long =response.data.results[0].geometry.location.lng ;
        $scope.data = "Sitio: " + sitio + "\nLatitud y Longitud: " + lat +","+ long;
        
    });
    

}]);

