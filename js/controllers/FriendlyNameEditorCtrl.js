
.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'userFactory',
	'Notification',
	'$interval',
	'graphdata',
function ($scope,$uibModalInstance,selectedDevice,userFactory,Notification,$interval,graphdata) { 

	
	
	$scope.sensorUpdate =[];	
	$scope.selectedDevice = selectedDevice;

  	$scope.saveDeviceName = function() {    
  	//Updating Fname
  
  	var data ={"_id" : $scope.selectedDevice._id ,"fname" : $scope.newfname};	
  		userFactory.submit('update/fname',data).then(function(response){
  	  		if(response.status ==200){
  	  			$scope.selectedDevice.name = $scope.newfname;  	
	  	  		Notification.success({ message:'Device Name Updated' , delay:4000 })	  	  		
	  	  	}
		})   
  				
  
  	
 	}
 	$scope.saveSensor = function(asset){
 	
 		var data={"_id" : $scope.selectedDevice._id ,"asset" : asset.assetInfo.id ,"fname" : asset.fnameUpdate}	
 		userFactory.submit('update/sname',data).then(function(response){

			if(response.status == 200){
	  	  		angular.forEach(selectedDevice.asset,function(value,key){
		 			if(value.id === asset.assetInfo.id){
		 				value.fname = asset.fnameUpdate;
		 				graphdata[asset.assetInfo.assigned].info.fname = asset.fnameUpdate;
		 			}
	
				})	
				Notification.success({ message:'Sensor Name Updated' , delay:4000 })
			}

		}) 
 		

 	}
	$scope.cancel = function() {
		//closing modal on cancel click
		
	  $uibModalInstance.dismiss('cancel');
	};	

	
}])
