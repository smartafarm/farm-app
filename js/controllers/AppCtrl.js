.controller('AppCtrl',['$scope',
	'$state',
	'USER_ROLES',
	'$rootScope',
  function ($scope,$state,USER_ROLES,$rootScope) {  
  // Main application controller	

  $scope.userRoles = USER_ROLES;
  //default route to dashboard
  $state.go('app.dashboard'); 

  
}])



