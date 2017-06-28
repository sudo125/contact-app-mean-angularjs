var app = angular.module('myContactApp', []);


app.controller('contactController', ['$scope','$http', '$rootScope', function($scope,$http, $rootScope){
    
    
    var refresh = function() {
        $http.get('/contact/').success(function(response) {
        console.log("I got the data that I requested from the server");
            
        $scope.contactlist = response;
        console.log($scope.contactlist);
          
        $scope.name = "";
        $scope.email = "";
        $scope.number = "";
      });
    };
    
    $scope.addContact = function() {
        console.log("add button is working");
		$http.post('/contact/', {
            'name': $scope.name, 
            'email': $scope.email,
            'number':$scope.number
        }).success(function(response){
			console.log(response);
			refresh();
        });
	};
    
    $scope.removeItem = function(id){
        console.log("delete button is working ");
        var id = id;
		$http.delete('/contact/'+ id).then(function(response){
			refresh();
        });
    };
    
    $scope.update = function(){
        
        console.log("update button is working");
        var id = $rootScope.id;
        
        $http.put('/contact/'+ id , {
            'name': $scope.name, 
            'email': $scope.email,
            'number':$scope.number
        }).then(function(response){
			console.log(response);
			refresh();
        });
    }
    
    $scope.edit = function(id){
        console.log("edit button is working");
        
        $http.get('/contact/'+ id).then(function(response){
            $rootScope.id = response.data[0]._id;
            console.log($rootScope.id);
            $scope.name = response.data[0].name;
            $scope.email = response.data[0].email;
            $scope.number = response.data[0].number;

		});
        
    }
    
    refresh();
    
}]);