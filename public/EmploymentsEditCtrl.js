  /*global angular */
 angular.
 module("EmploymentManagerApp").
 controller("EmploymentsEditCtrl", 
 ["$scope", "$http","$routeParams","$location" ,function($scope, $http, $routeParams,$location) 
 {
     var employmentUrl = "/api/v1/employments/"+$routeParams.country+"/"+$routeParams.year;

        $http.get(employmentUrl).then(function(response) {
             $scope.updateEmployment = response.data;
        });
 
          $scope.updateEmployment = function() {
          $http.put(employmentUrl, $scope.updateEmployment).then(function(response) {
            $scope.status = "Status:" + response.status;
           
 });         };
         
          
 }]);