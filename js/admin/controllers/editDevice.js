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
  		
  		var data = {};
  		data.uname = devices[0].uname;  		
  		data.dAccess = $scope.selectedDevices;   		  		
  			userFactory.submit('admin/setDeviceAccess',data).then(function(response){  	
  				if(response.status == 202){
  					Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
  				}else
  				{				
					devices[0].devices = $scope.selectedDevices;
					$uibModalInstance.dismiss('cancel');
					Notification.success({message : 'Device Settings Updated' ,delay : 3000})	
				}
  			});  		
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])