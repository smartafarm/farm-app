.controller('NavCtrl', ['$rootScope',
	'$scope',
	'$state',
	'$interval',
	'sessionService',
	'$http',
	function($rootScope,$scope,$state,$interval,sessionService,$http){

	$scope.logout = function(){		
		var key =sessionStorage.getItem('user') 
		sessionService.destroy(key)
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common['Bearer'] = undefined;
		$state.go('login',{}, {reload:true});
	}
	var username = sessionStorage.getItem('user');
	if (username) $scope.userName = username
	
	
}])