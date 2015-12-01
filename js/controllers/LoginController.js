.controller('LoginCtrl',[
  '$scope', 
  '$rootScope', 
  'Notification',
  '$state',
  'LoginService',
  'sessionService',
 function ($scope, $rootScope,Notification,$state,LoginService,sessionService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  
  $scope.login = function(credentials){
  	LoginService.login(credentials).then(function(response){
    if(!response){
    Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );

    }
    $rootScope.details = response.data.details;
  
    $state.go('app');
  	},function(response){
      console.log(response)   ;
  		
  	});
  	
  }
}])
