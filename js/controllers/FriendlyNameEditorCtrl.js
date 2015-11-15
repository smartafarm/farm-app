
.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'UpdateService',
	'notify',
	'$interval',
function ($scope,$uibModalInstance,selectedDevice,UpdateService,notify,$interval) {  
	
	$scope.selectedDevice = selectedDevice;

  	$scope.ok = function() {    
  	var data ={"_id" : $scope.selectedDevice._id ,"newname" : $scope.editFname.fname.$modelValue};	  
  	  
  	  UpdateService.deviceStatus('update/fname',data).then(function(response){
  	  		$scope.selectedDevice.name = $scope.editFname.fname.$modelValue;
			$uibModalInstance.close();
			$interval( notify({ message:'Device Name updated for #' + $scope.selectedDevice._id , duration:'10000',position:'right' } ), 1000); 
		},function(response){
			alert('Update failed');
		})
	
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  

}])
