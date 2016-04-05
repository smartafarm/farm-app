// Main application controller
.controller('AppCtrl',['$scope',
	'$state',
	'USER_ROLES',
	'$rootScope',
  function ($scope,$state,USER_ROLES,$rootScope) {  
  	
//user role profile
$scope.userRoles = USER_ROLES;

//default route to dashboard
// $state.go('app.dashboard'); 

  
}])



