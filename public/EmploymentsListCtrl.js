 /*global angular */
          angular.module("EmploymentManagerApp").controller("EmploymentsListCtrl", ["$scope", "$http", function($scope, $http) {
           var api = "/api/v1/employments";
         
            $scope.addEmployment = function() {
             $http.post(api, $scope.newEmployment).then(function(response) {
              $scope.employments = response.data;
              $scope.status = "Status:" + response.status;
              getEmployments();
             });
            };
           $scope.deleteEmployment = function(country, year) {
            $http.delete(api+"/"+country+"/" + year).then(function(response) {
             $scope.status = "Status:" + response.status;
         
             getEmployments();
            });
            getEmployments();
           };
           $scope.deleteAllEmployment = function() {
            $http.delete(api).then(function(response) {
             $scope.status = "Status:" + response.status;
             getEmployments();
            });
            getEmployments();
           };
         
    $scope.getLoad = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            getEmployments();
        });
    };

           function getEmployments() {
            $http.get(api).then(function(response) {
             $scope.employments = response.data;
            });
           }
           getEmployments();
         
          }]);
          