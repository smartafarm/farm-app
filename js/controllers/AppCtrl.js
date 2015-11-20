.controller('AppCtrl',['$scope',
	'$state',
	'USER_ROLES',
	'$rootScope',
  function ($scope,$state,USER_ROLES,$rootScope) {  

  $scope.userRoles = USER_ROLES;
  $state.go('app.dashboard');  
  $scope.showModal = false;
}])



