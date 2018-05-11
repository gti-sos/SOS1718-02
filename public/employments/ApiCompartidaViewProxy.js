/*global angular,app,request*/

angular.module("App").
controller("ApiCompartidaViewProxy", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiServerHost = 'https://sos1718-08.herokuapp.com';
    app.use("/p", function(req, res) {
        var url = apiServerHost + req.url;
        req.pipe(request(url)).pipe(res);
    })

}]);
