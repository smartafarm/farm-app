.controller('editDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'adminService',
	'Notification',
function ($scope,$uibModalInstance,devices,adminService,Notification) {  
	$scope.test = true;
	$scope.selectedDevices = {};
	adminService.getData('admin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
	adminService.getData('admin/getDevices/'+devices[0].Organisation).then(function(response){
  			$scope.data = response;  	  				

  			
  
  		$scope.data.forEach(function(deviceProp,value){ 
         
  			if(devices[0].devices[deviceProp._id]){

  				if(devices[0].devices[deviceProp._id].status == true){
					$scope.selectedDevices[deviceProp._id] = devices[0].devices[deviceProp._id]  					

          if(!devices[0].devices[deviceProp._id].func){            
            $scope.selectedDevices[deviceProp._id].func = [];
          }
        }
				}
          
  			else{
				$scope.selectedDevices[deviceProp._id] = {'status' : false , 'func' : []}  				
  			}
  			
  		})
  		
  		},function(response){				
				console.log(response);
		});
$scope.changeAlert = function(device,test){
	

  
	
}
$scope.changeFunc =function(device ,funct){
  
	var index = $scope.selectedDevices[device].func.indexOf(funct);
	if($scope.selectedDevices[device].func.indexOf(funct) == -1){
		$scope.selectedDevices[device].func.push(funct);
	}else{
		$scope.selectedDevices[device].func.splice(index,1);
	}
	
}

// eof testing
	
	
  	$scope.ok = function() {  
  		
  		var data = {};
  		
  		data.uname = devices[0].uname;  
  		data.dAccess ={};
  		angular.forEach($scope.selectedDevices,function(value,key){
  			if(value.status == true){
  				data.dAccess[key] = value;
  			}
  		})
  		
  		
  		
  			adminService.submit('admin/setDeviceAccess',data).then(function(response){  	
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