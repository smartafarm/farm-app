.controller('rawDataCtrl' ,['$scope','userFactory','$state','$rootScope',function ($scope,userFactory,$state,$rootScope) {
	
//Temporary controller for raw data from device

$scope.refresh= function(){	
	//pull data on button click
	userFactory.receive('fetch/getrawdata').then(function(response){
  			var data = response;        
  			$scope.rawdata = data;  		
  		},function(response){				
				console.log(response);
		});
}
//called to receive data when controller initiated
$scope.refresh();
}])