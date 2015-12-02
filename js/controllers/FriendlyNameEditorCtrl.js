
.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'UpdateService',
	'notify',
	'$interval',
function ($scope,$uibModalInstance,selectedDevice,UpdateService,notify,$interval) { 

	//Device Friendly Name Editor Modal Controller 
	//Click event initiates a modal via directive
	$scope.selectedDevice = selectedDevice;

  	$scope.ok = function() {    
  	//Retreiving changes	
  	var data ={"_id" : $scope.selectedDevice._id ,"newname" : $scope.editFname.fname.$modelValue};	  
  	  
  	  //updating on server
  	  UpdateService.deviceStatus('update/fname',data).then(function(response){
  	  		$scope.selectedDevice.name = $scope.editFname.fname.$modelValue;

  	  		//closing modal and initiating message
			$uibModalInstance.close();
			$interval( notify({ message:'Device Name updated for #' + $scope.selectedDevice._id , duration:'10000',position:'right' } ), 1000); 

		},function(response){
			alert('Update failed');
		})
	
	};

	$scope.cancel = function() {
		//closing modal on cancel click
	  $uibModalInstance.dismiss('cancel');
	};	
  

}])
