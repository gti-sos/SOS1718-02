angular.module("App")
.config(function(angularAuth0Provider) {
    angularAuth0Provider.init({
      clientID: 'Cz-IbavUW4hLwvIEFx9M5pMH92OvEC_d',
      domain: 'expenditures.eu.auth0.com',
      responseType: 'token id_token',
      audience: 'https://expenditures.eu.auth0.com/userinfo',
      redirectUri: 'https://sos1718-02-alc-sos171802alc.c9users.io/#!/expenditures/login',
      scope: 'openid'
    });
})
.controller("ExpendituresLoginCtrl", ["$scope", 'angularAuth0', function($scope, angularAuth0) {
    console.log("Login Ctrl initialized!");
    var BASE_API = "/api/v2";
    var BASE_API_PATH = "/api/v2/expenditures";

    $scope.login = function login() {
      angularAuth0.authorize();
    }

}]);
