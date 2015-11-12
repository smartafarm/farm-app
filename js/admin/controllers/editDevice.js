.controller('editDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'userFactory',
	'Notification',
function ($scope,$uibModalInstance,devices,userFactory,Notification) {  
	
	userFactory.receive('admin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
	userFactory.receive('admin/getAllDevices').then(function(response){
  			$scope.data = response;  	  					
  			$scope.selectedDevices=[];
  			
		if(devices[0].devices){
  			$scope.selectedDevices = devices[0].devices
  		}

  		
  		},function(response){				
				console.log(response);
		});



// eof testing
	
	
  	$scope.ok = function() {  
  		devices[0].devices = $scope.selectedDevices;
  		var data = {};
  		data.uname = devices[0].uname;
  		data.dAccess = $scope.selectedDevices; 
  		console.log(data);
  			userFactory.submit('admin/setDeviceAccess',data).then(function(response){  				
  				//$uibModalInstance.dismiss('cancel');
  				Notification.success({message : 'Device Settings Updated' ,delay : 3000})	
  			},function(response){				
				console.log(response);
			});
  		
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])