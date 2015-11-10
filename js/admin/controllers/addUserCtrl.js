
.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
function ($scope,$uibModalInstance,$interval) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		console.log($scope.user);
  		//$uibModalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	console.log('here');

}])
