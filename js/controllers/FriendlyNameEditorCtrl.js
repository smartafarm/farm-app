
.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'UpdateService',
	'Notification',
	'$interval',
	'graphdata',
function ($scope,$uibModalInstance,selectedDevice,UpdateService,Notification,$interval,graphdata) { 

	//Device Friendly Name Editor Modal Controller 
	//Click event initiates a modal via directive
	$scope.addSensorbtn = false;
	$scope.sensorUpdate =[];
	$scope.newSensor = [];
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
		  	  		 if(graphdata[$scope.sensorUpdate[i].id])
			  	   {
			  	   	if(graphdata[$scope.sensorUpdate[i].id].info.id == $scope.sensorUpdate[i].id)
			  	   	 {graphdata[$scope.sensorUpdate[i].id].info.fname = $scope.sensorUpdate[i].fname};
			  	   }			  	  		
		  	   }
		  	  
		  	})

  	  		//closing modal and initiating message
			$uibModalInstance.close();
			Notification.success({ message:'Update successful' , delay:4000 })

		},function(response){
			Notification.error('Update failed');
		})
	
	};
	$scope.addSensor = function(){
		$scope.addSensorbtn = true;
  		$scope.newSensor.push({'id' : 'No' , 'fname' : 'Friendly Name'});  		
  	}
	$scope.cancel = function() {
		//closing modal on cancel click
		
	  $uibModalInstance.dismiss('cancel');
	};	
  	$scope.checkSensor = function(index){  	

  				
  			
  				
  				var data= {'id' : $scope.selectedDevice._id , 'sensor' : $scope.newSensor[index].id}
				UpdateService.deviceStatus('update/checksensor',data).then(function(response){
					if(response == true){
						$scope.selectedDevice.sensor.push({'id': $scope.newSensor[index].id ,'fname' : $scope.newSensor[index].fname})						
						$scope.addSensorbtn = false;				
						$scope.newSensor.splice(index,1);
						Notification.success({ message:'Sensor Added' , delay:3000 });
					}else{
						Notification.error({ message:'Sensor Exists' , delay:3000 });
					}
				})

			}

	
}])
