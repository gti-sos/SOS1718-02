/* global angular */

angular.module("App").controller("ListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API = "/api/v2";
    var BASE_API_PATH = "/api/v2/expenditures";
    var BASE_API_PATH_LIMIT = "/api/v2/expenditures?&limit=10";


    var BASE_API_PATH_2 = "/api/v2/employments";

    var BASE_API_3 = "/api/v1";
    var BASE_API_PATH_3 = "/api/v1/unemployments";
    var BASE_API_PATH_LIMIT_3 = "/api/v1/unemployments?&limit=10";
    var dataCount = 0;

    $scope.addExpenditure = function() {
        $http.post(BASE_API_PATH, $scope.newExpenditure).then(function(response) {
            $scope.status = "Status: " + response.status;
            getExpenditures();
        });
    };

    $scope.deleteExpenditure = function(country, year) {
        $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newExpenditure)
            .then(function(response) {
                $scope.status = response.data;
                getExpenditures();
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH).then(function(response) {
            $scope.status = response.data;
            getExpenditures();
        });
    };

    $scope.getSearch = function() {
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
        console.log(query);
        $http.get(BASE_API_PATH + "/?" + query).then(function(response) {
            $scope.expenditures = response.data;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getExpenditures();
            $scope.status = response.data;
        });
    };

    function getExpenditures() {
        $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
            $scope.expenditures = response.data;
            dataCount = response.data.length;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
            $scope.status = response.data;
        });
    }

    $scope.getExpendituresSecured = function() {
        $http.get(BASE_API + "/secure/expenditures", {
            headers: { "user": $scope.user, "pass": $scope.pass }
        }).then(function(response) {
            $scope.expenditures = response.data;
            $scope.status = "Authorized";
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
            $scope.status = response.data;
        });
    };

    $scope.getPage = function(p) {
        $scope.offsetP = $scope.offsetP + p;
        console.log($scope.offsetP);
        $http.get(BASE_API_PATH_LIMIT + "&offset=" + $scope.offsetP).then(function(response) {
            $scope.expenditures = response.data;
            $scope.hasNextPage = response.data.length >= p;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.expenditures = [];
        });
    };
    getExpenditures();


    $scope.addEmployment = function() {
        $http.post(BASE_API_PATH_2, $scope.newEmployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getEmployment();
        });
    };

    $scope.deleteEmployment = function(country, year) {
        $http.delete(BASE_API_PATH_2 + "/" + country + "/" + year, $scope.newEmployment)
            .then(function(response) {
                $scope.status = response.data;
                getEmployment();
            });
    };

    $scope.deleteAllEmployment = function() {
        $http.delete(BASE_API_PATH_2).then(function(response) {
            $scope.status = response.data;
            getEmployment();
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH_2 + "/loadInitialData").then(function(response) {
            getEmployment();
            $scope.status = response.data;
        });
    };

    function getEmployment() {
        $http.get(BASE_API_PATH_2).then(function(response) {
            $scope.employments = response.data;
        });
    }

    getEmployment();









    $scope.addUnemployment = function() {
        $http.post(BASE_API_PATH_3, $scope.newUnemployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getUnemployments();
        });
    };

    $scope.deleteUnemployment = function(country, year) {
        $http.delete(BASE_API_PATH_3 + "/" + country + "/" + year, $scope.newUnemployment)
            .then(function(response) {
                $scope.status = response.data;
                getUnemployments();
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH_3).then(function(response) {
            $scope.status = response.data;
            getUnemployments();
        });
    };

    $scope.getSearch = function() {
        if (!$scope.newUnemployment.country) {
            delete $scope.newUnemployment.country;
        }
        if (!$scope.newUnemployment.year) {
            delete $scope.newUnemployment.year;
        }
        if (!$scope.newUnemployment.young) {
            delete $scope.newUnemployment.young;
        }
        if (!$scope.newUnemployment.adult) {
            delete $scope.newUnemployment.adult;
        }
        if (!$scope.newUnemployment.old) {
            delete $scope.newUnemployment.old;
        }
        if (!$scope.newUnemployment.longterm) {
            delete $scope.newUnemployment.longterm;
        }
        var query = $httpParamSerializer($scope.newUnemployment);
        query.limit = 10;
        query.offset = 10;
        console.log(query);
        $http.get(BASE_API_PATH_3 + "/?" + query).then(function(response) {
            $scope.unemployments = response.data;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH_3 + "/loadInitialData").then(function(response) {
            getUnemployments();
            $scope.status = response.data;
        });
    };

    function getUnemployments() {
        $http.get(BASE_API_PATH_3).then(function(response) {
            $scope.unemployments = response.data;
            dataCount = response.data.length;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
            $scope.status = response.data;
        });
    }

    $scope.getUnemploymentsSecured = function() {
        $http.get(BASE_API_3 + "/secure/unemployments", {
            headers: { "user": $scope.user, "pass": $scope.pass }
        }).then(function(response) {
            $scope.unemployments = response.data;
            $scope.status = "Authorized";
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
            $scope.status = response.data;
        });
    };

    $scope.getPage = function(p) {
        $scope.offsetP = $scope.offsetP + p;
        console.log($scope.offsetP);
        $http.get(BASE_API_PATH_LIMIT_3 + "&offset=" + $scope.offsetP).then(function(response) {
            $scope.unemployments = response.data;
            $scope.hasNextPage = response.data.length >= p;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.unemployments = [];
        });
    };
    getUnemployments();

}]);
