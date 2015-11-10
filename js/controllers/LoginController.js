.controller('LoginCtrl',[
  '$scope', 
  '$rootScope', 
  'notify',
  '$state',
  'LoginService',
  'sessionService',
 function ($scope, $rootScope,notify,$state,LoginService,sessionService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function(credentials){
  	LoginService.login(credentials).then(function(data){  	
      $state.go('app');
  	},function(data){
  		notify({ message:'Login Failed. Please try again' ,duration:'10000',position:'center' } )
  	});
  	
  }
}])
