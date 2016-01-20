
.controller('addOrgCtrl',[
	'$scope',
  'adminService',
  'myData',
  'Notification',
  '$uibModalInstance',
	
function ($scope,adminService,myData,Notification,$uibModalInstance) {  
	
$scope.user ={};

  	$scope.ok = function() {          
      
  		adminService.submit('admin/createOrg',$scope.org).then(function(response){
      if(response.status == 202){
            Notification.error({message : 'Creation Failed . Please try again' ,delay : 3000})
          }else
          {       
          myData.push(
            {
              "Name" : $scope.org.name,
              "cperson" : $scope.org.cperson,
              "Phone No" :$scope.org.pno ,          
              "Email" : $scope.org.email,
              "type" : $scope.org.type,
              "add" : $scope.org.address.add1 + ' ' + $scope.org.address.sub + ' ' + $scope.org.address.state + ' ' + $scope.org.address.pocode
            })
            Notification.success({message : 'Organisation Added' ,delay : 3000})
          }
  		},function(response){				
				console.log(response);
		});
  		$uibModalInstance.dismiss('cancel');
	};
	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])
