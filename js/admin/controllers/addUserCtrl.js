
.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
	'myData',
  'Notification',
function ($scope,$uibModalInstance,$interval,adminService,myData,Notification) {  
	
	$scope.user ={};
    //getting all organisation for adding user
    adminService.submit('admin/getOrg/addUser').then(function(response){$scope.org = response})
  	$scope.ok = function() {    
      if($scope.user.details.type = "Admin") $scope.user.details.type = "oadmin";
      
  		adminService.submit('admin/createUser',$scope.user).then(function(response){
        if(response.status == 202){
            Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
          }else
          {       
            myData.push(
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
  	
  $scope.selOrg =function(){
  if(!$scope.user.details){
    $scope.user.details = {};
    $scope.user.details.address = {};
  } else{
    $scope.user.details.address = {};
  }
   
    
  $scope.user.details.address.a1= $scope.bname.address.add1;
   $scope.user.details.address.town= $scope.bname.address.sub;
   $scope.user.details.address.state= $scope.bname.address.state;
   $scope.user.details.address.pocode= $scope.bname.address.pocode;
   $scope.user.details.bname= $scope.bname.name;
  }    

}])
