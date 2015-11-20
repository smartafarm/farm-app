.controller('rawDataCtrl' ,['$scope','userFactory','$state','$rootScope',function ($scope,userFactory,$state,$rootScope) {
	

$scope.refresh= function(){	
	userFactory.receive('fetch/getrawdata').then(function(response){
  			var data = response;        
  			$scope.rawdata = data;  		
  		},function(response){				
				console.log(response);
		});
}
$scope.refresh();
}])