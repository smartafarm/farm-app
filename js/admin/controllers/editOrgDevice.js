.controller('editOrgDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'userFactory',
  'adminService',
	'Notification',
function ($scope,$uibModalInstance,devices,userFactory,adminService,Notification) {  
	$scope.test = true;
	$scope.selectedDevices = {};
	userFactory.receive('admin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
	userFactory.receive('admin/getAllDevices').then(function(response){
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
	console.log($scope.selectedDevices);
	
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
  		
  		data.oname = devices[0].Name;  
  		data.dAccess ={};
  		angular.forEach($scope.selectedDevices,function(value,key){
  			if(value.status == true){
  				data.dAccess[key] = value;
  			}
  		})
  		
  		console.log(data);
  		
  			adminService.submit('admin/setOrgDeviceAccess',data).then(function(response){  	
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