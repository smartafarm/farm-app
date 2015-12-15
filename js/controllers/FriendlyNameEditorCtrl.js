
.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'UpdateService',
	'Notification',
	'$interval',
function ($scope,$uibModalInstance,selectedDevice,UpdateService,Notification,$interval) { 

	//Device Friendly Name Editor Modal Controller 
	//Click event initiates a modal via directive
	$scope.sensorUpdate =[];
	$scope.selectedDevice = selectedDevice;

  	$scope.ok = function() {    
  	//Retreiving changes	
  	var data ={"_id" : $scope.selectedDevice._id ,"newname" : $scope.editFname.fname.$modelValue , "sensor" : $scope.sensorUpdate};	    	
  	
  	
  	//updating on server
  	 UpdateService.deviceStatus('update/fname',data).then(function(response){
  	  		$scope.selectedDevice.name = $scope.editFname.fname.$modelValue;
  	  		selectedDevice.sensor.forEach(function(value,key){
		  	  for(i=0;i<$scope.sensorUpdate.length;i++){
		  	  	if(value.id == $scope.sensorUpdate[i].id)
		  	  		value.fname = $scope.sensorUpdate[i].fname;
		  	   }
		  	})

  	  		//closing modal and initiating message
			$uibModalInstance.close();
			Notification.success({ message:'Update successful' , delay:4000 })

		},function(response){
			alert('Update failed');
		})
	
	};

	$scope.cancel = function() {
		//closing modal on cancel click
		
	  $uibModalInstance.dismiss('cancel');
	};	
  
	
}])
