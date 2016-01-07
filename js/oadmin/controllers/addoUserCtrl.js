
.controller('addorgUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'oadminService',	
  'Notification',
  'parent',  
function ($scope,$uibModalInstance,$interval,oadminService,Notification,parent) {  

	$scope.user ={};
  //initialize existing details for form
  if(!$scope.user.details){
    $scope.user.details = {};
    $scope.user.details.address = {};
  }
  if(!$scope.user.details){   
    $scope.user.details.address = {};
  }
  $scope.user.details.address.a1= parent.info.address.add1;
   $scope.user.details.address.town= parent.info.address.sub;
   $scope.user.details.address.state= parent.info.address.state;
   $scope.user.details.address.pocode= parent.info.address.pocode;
   $scope.user.details.bname= parent.info.name;

// button commands
  $scope.ok = function() {    
    //create user for organisation
  		oadminService.submit('oadmin/createUser',$scope.user).then(function(response){
        if(response.status == 202){
            Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
          }else
          {       
            parent.myData.push(
            {
              "First Name" : $scope.user.details.fname,
              "Last Name" : $scope.user.details.lname,
              "uname" : $scope.user.uname,
              "Email" : $scope.user.details.email,
              "Organisation" :$scope.user.details.bname,
              "Phone No" :$scope.user.details.pno   ,          
              "devices": []

            })
            Notification.success({message : 'User Added' ,delay : 3000})
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
