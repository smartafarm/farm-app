// Master login controller
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
  
  //main login page function. 
  //Triggered on sumbit
  
  $scope.login = function(credentials){
    
    //Checking credintials
  	LoginService.login(credentials).then(function(response){

    if(!response){
    //if no response recevied
    Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );
    }
    
    //routing to main application on successful login
    $state.go('app.dashboard');
  	},function(response){
         //console.log(response)   ;
  		
  	});
  	
  }
}])
