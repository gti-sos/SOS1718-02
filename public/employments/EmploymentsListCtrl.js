/* global angular */

angular.module("App").controller("EmploymentsListCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    console.log("List Ctrl initialized!");
    var BASE_API_PATH = "/api/v2/employments";

    var BASE_API_PATH_ = "/api/v2/secure/employments";
    var BASE_API_PATH_LIMIT = "/api/v2/employments?&limit=10";
    var offsetP = 0;
    var dataCount = 0;

    $scope.addEmployment = function() {
        $http.post(BASE_API_PATH, $scope.newEmployment).then(function(response) {
            $scope.status = "Status: " + response.status;
            getEmployment();
        });
    };

    $scope.deleteEmployment = function(country, year) {
        $http.delete(BASE_API_PATH + "/" + country + "/" + year, $scope.newEmployment)
            .then(function(response) {
                $scope.status = response.data;
                getEmployment();
            });
    };

    $scope.deleteAll = function() {
        $http.delete(BASE_API_PATH).then(function(response) {
            $scope.status = response.data;
            getEmployment();
        });
    };

    $scope.getSearch = function() {
        if (!$scope.newEmployment.country) {
            delete $scope.newEmployment.country;
        }
        if (!$scope.newEmployment.year) {
            delete $scope.newEmployment.year;
        }
        if (!$scope.newEmployment.totalself) {
            delete $scope.newEmployment.totalself;
        }
        if (!$scope.newEmployment.totalsalaried) {
            delete $scope.newEmployment.totalsalaried;
        }
        if (!$scope.newEmployment.totalcontributingfamilyworker) {
            delete $scope.newEmployment.totalcontributingfamilyworker;
        }
        var query = $httpParamSerializer($scope.newEmployment);
        query.limit = 10;
        query.offset = 10;


        $http.get(BASE_API_PATH + "/?" + query).then(function(response) {
            $scope.employments = response.data;
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.employment = [];
        });
    };

    $scope.getLoad = function() {
        $http.get(BASE_API_PATH + "/loadInitialData").then(function(response) {
            getEmployment();
            $scope.status = response.data;
        });
    };

    
    function getEmployment() {
        $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
            $scope.employments = response.data;
            console.log(response.data);
            dataCount = response.data.length();
            console.log(response.data);
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.employments = [];
            $scope.status = response.data;
        });
    }

    $scope.getCount = function() {
        if (!$scope.newEmployment.country) {
            delete $scope.newEmployment.country;
        }
        if (!$scope.newEmployment.year) {
            delete $scope.newEmployment.year;
        }
        if (!$scope.newEmployment.totalself) {
            delete $scope.newEmployment.totalself;
        }
        if (!$scope.newEmployment.totalsalaried) {
            delete $scope.newEmployment.totalsalaried;
        }
        if (!$scope.newEmployment.totalcontributingfamilyworker) {
            delete $scope.newEmployment.totalcontributingfamilyworker;
        }
        var query = $httpParamSerializer($scope.newEmployment);
        $http.get(BASE_API_PATH + "/?" + query + "&offset=0&limit=0").then(function(response) {
            $scope.count = response.data.length;
        });
    };
    $scope.getEmploymentsSecured = function() {
        $http.get(BASE_API_PATH_, {
            headers: { "user": $scope.user, "pass": $scope.pass }
        }).then(function(response) {
            $scope.employments = response.data;
            $scope.status = "Authorized";
        }, function errorCallback(response) {
            console.log("Empty");
            $scope.employments = [];
            $scope.status = response.data;
        });
    };

    $scope.getPage = function(p) {
        offsetP = offsetP + p;
        console.log(offsetP);
        if (offsetP < 0) {
            $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
                $scope.employments = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.employments = [];
            });
        }
        else if (false) {
            $http.get(BASE_API_PATH_LIMIT + "&offset=0").then(function(response) {
                $scope.employments = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.employments = [];
            });
        }
        else if (offsetP > 20) {
            $http.get(BASE_API_PATH_LIMIT + "&offset=20").then(function(response) {
                $scope.employments = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.employments = [];
            });
        }
        else {
            $http.get(BASE_API_PATH_LIMIT + "&offset=" + offsetP).then(function(response) {
                $scope.employments = response.data;
            }, function errorCallback(response) {
                console.log("Empty");
                $scope.employments = [];
            });
        }
    };
    getEmployment();
}]);
