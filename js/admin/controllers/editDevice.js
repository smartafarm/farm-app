.controller('editDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'userFactory',
function ($scope,$uibModalInstance,devices,userFactory) {  	
	userFactory.receive('admin/getAllDevices').then(function(response){
  			$scope.data = response;
  		},function(response){				
				console.log(response);
		});


    

// eof testing

	console.log(devices);
  	$scope.ok = function() {      		
  		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])