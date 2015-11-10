.controller('AppCtrl',['$scope',
	'$state',
	'USER_ROLES',
  function ($scope,$state,USER_ROLES) {  
  $scope.userRoles = USER_ROLES;
  $state.go('app.dashboard');  
  $scope.showModal = false;
}])



