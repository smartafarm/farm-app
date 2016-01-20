.controller('forgotCtrl',[
  '$scope', 
  '$rootScope', 
  'Notification',
  '$state',
  'LoginService',
  
 function ($scope, $rootScope,Notification,$state,LoginService) { 
  
  
  
  $scope.submit = function(credentials){
    
    //Checking credintials
    $scope.loading = true;
  	LoginService.getd('login/forgot/exists',$scope.frgot.uname).then(function(response){
    	if(response.status == 200){
    		if(response.data ==1){
    			Notification.success({message:'Reset Link Sent'});
    			$scope.success = true;
    			$scope.error = false;
    		}else{
    			$scope.error = "Usename does not exist";
    		}
    	}
    	$scope.loading = false;
	  	},function(response){
	  	});
  	
  	}
}])