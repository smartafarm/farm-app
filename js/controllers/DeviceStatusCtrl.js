// Device status change controller
.controller('deviceStatusCtrl',[
	'$scope',
	'UpdateService',
	'notify',
	'$interval',
function ($scope,UpdateService,notify,$interval) {  
	
$scope.statusToggle = function(){
	
	if($scope.device.Status == 1){
		// updating values on server side
		var data ={"_id" : $scope.device._id ,"status" : 0};
		UpdateService.deviceStatus('update/deviceStatus',data).then(function(){
			$scope.device.Status = 0;
			$interval( notify({ message:'Device #'+ $scope.device._id+' De-Activated' , classes:'alert-danger' , duration:'10000',position:'right' } ), 1000); 
		})
	}else
	{
		var data ={"_id" : $scope.device._id ,"status" : 1};
		UpdateService.deviceStatus('update/deviceStatus',data).then(function(){
			$scope.device.Status = 1;
			$interval( notify({ message:'Device #'+ $scope.device._id+' Activated' , classes:'color:green', duration:'10000',position:'right' } ), 1000); 
		})
	}
}

}])
