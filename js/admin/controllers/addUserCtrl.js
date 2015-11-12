
.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
	'myData',
function ($scope,$uibModalInstance,$interval,adminService,myData) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		adminService.submit('admin/createUser',$scope.user).then(function(response){
  				myData.push(
  					{
  						"First Name" : $scope.user.details.fname,
  						"Last Name" : $scope.user.details.lname,
  						"User Name" : $scope.user.uname,
  						"Email" : $scope.user.details.email,
  						"Organisation" :$scope.user.details.bname,
  						"Phone No" :$scope.user.details.pno  	,					 
  						"devices": []

  					})
  		},function(response){				
				console.log(response);
		});
  		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	console.log('here');

}])
