var MYapp=angular.module('myApp',[]);
MYapp.controller('AppController',['$scope','$http',function($scope,$http){
	console.log("Hello ankit From Our Controller");

var refresh =function(){
	$http.get('/contactlists').then(function(success){
		console.log("I got the data i requested",success);
		$scope.contactlists=success.data;
        
	 },function(error){
	    console.log("Didn't got data i requested",error);
	});
	$scope.contact ={};
	// this will clear our input boxes when we call refresh
};

refresh(); //calling this function so that it get the data when the page load

$scope.addContact = function(){
	console.log($scope.contact);
	$http.post("/contactlists",$scope.contact).then(function(response){
		console.log(response);
        
	},function(error){
        console.log(error);
	})
	refresh();  
//using this refresh function because on clicking on add contact we are just posting data in db but won't showing it in ui  
};	
$scope.remove = function(id){
	console.log(id);
	$http.delete("/contactlists/" + id).then(function(response){
		refresh();
	},function(error){
		console.log(error);
	})
}
$scope.edit =function(id){
	console.log(id);
	$http.get("/contactlists/" +id).then(function(response){
     $scope.contact=response.data;
	},function(error){
         console.log(error);
	});
}
$scope.update =function(){
	console.log($scope.contact._id);
	$http.put("/contactlists/" + $scope.contact._id,$scope.contact).then(function(response){
		refresh();
	},function(error){
         console.log(error);
	});
}
$scope.deselect =function(){
	$scope.contact="";
}	
	// $scope.contactlists=contactlist;
}]);
