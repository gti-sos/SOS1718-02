/* global angular */
angular.module("App").controller("ExpendituresListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API = "/api/v2";
    var BASE_API_PATH = "/api/v2/expenditures";
    var BASE_API_PATH_LIMIT = "/api/v2/expenditures?&limit=10";
    var user = window.localStorage;
    var dataCount = 0;

    $scope.offsetP = 0;
    $scope.hasNextPage = true;

    $scope.addExpenditure = function() {
        if (user.admin == "true") {
            $http.post(BASE_API_PATH, $scope.newExpenditure).then(function(response) {
            $scope.status = "Status: " + response.status;
            getExpenditures();
            window.alert("Created");
        }, function errorCallback(response) {
            console.log("Bad request");
            window.alert("Bad request");
            $scope.status("Bad request");
        });
        }
        else{
            window.alert("Unauthorized");
        }
    };

    $scope.deleteExpenditure = function(country, year) {
        if (user.admin == "true") {
            $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newExpenditure)
                .then(function(response) {
                    $scope.status = response.data;
                    getExpenditures();
                    window.alert(response.data);
                });
        }
        else {
            window.alert("You are not admin");
        }
    };

    $scope.deleteAll = function() {
        if (user.admin == "true") {
            $http.delete(BASE_API_PATH).then(function(response) {
                $scope.status = response.data;
                getExpenditures();
                window.alert(response.data);
            });
        }
        else {
            window.alert("You are not admin");
        }
    };

    $scope.getSearch = function() {
        $scope.status="";
        if (user.logged == "true") {
            if (!$scope.newExpenditure.country) {
                delete $scope.newExpenditure.country;
            }
            if (!$scope.newExpenditure.year) {
                delete $scope.newExpenditure.year;
            }
            if (!$scope.newExpenditure.primary) {
                delete $scope.newExpenditure.primary;
            }
            if (!$scope.newExpenditure.secundary) {
                delete $scope.newExpenditure.secundary;
            }
            if (!$scope.newExpenditure.tertiery) {
                delete $scope.newExpenditure.tertiery;
            }
            var query = $httpParamSerializer($scope.newExpenditure);
            query.limit = 10;
            query.offset = 10;
            $http.get(BASE_API_PATH + "/?" + query).then(function(response) {
                $scope.expenditures = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.status="Empty";
                $scope.expenditures = [];
            });
        }
        else {
            window.alert("Not logged!!");
        }
    };

    $scope.getLoad = function() {
        if (user.admin == "true") {
            $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
                getExpenditures();
                $scope.status = response.data;
                window.alert(response.data);
            });
        }
        else {
            window.alert("You are not admin");
        }
    };

    function getExpenditures() {
        if (user.logged == "true") {
            $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
                $scope.expenditures = response.data;
                dataCount = response.data.length;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.expenditures = [];
                $scope.status = response.data;
            });
        }
        else {
            window.alert("Not logged!!");
        }

    }

    $scope.getExpendituresSecured = function() {
        user.clear();
        $http.get(BASE_API + "/secure/expenditures", {
            headers: $scope.user
        }).then(function(response) {
            if (response.data) {
                user.logged = "true";
                getExpenditures();
                window.alert("Welcome!!");
                if (response.data.admin == true) {
                    user.admin = "true";
                    window.alert("You are admin.");
                }
            }
            else {
                window.alert("Unauthorized!!");
                $scope.expenditures = [];
                user.logged = "false";
                user.admin = "false";
            }
        }, function errorCallback(response) {
            console.log("Unauthorized!!");
            user.logged = "false";
            user.admin = "false";
        });
    };

    $scope.getPage = function(p) {
        $scope.offsetP = $scope.offsetP + p;
        $http.get(BASE_API_PATH_LIMIT + "&offset=" + $scope.offsetP).then(function(response) {
            $scope.expenditures = response.data;
            $scope.hasNextPage = response.data.length >= p;
        }, function errorCallback(response) {
            $scope.expenditures = [];
            console.log("Not found!");
        });
    };
    getExpenditures();
}]);
