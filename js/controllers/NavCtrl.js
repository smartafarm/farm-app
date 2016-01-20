.controller('NavCtrl', ['$rootScope',
	'$scope',
	'$state',
	'$interval',
	'sessionService',
	'$http',
	function($rootScope,$scope,$state,$interval,sessionService,$http){
//Navigation bar controller		

	$scope.logout = function(){		
		//retreiving user to logout
		var key =sessionStorage.getItem('user') 
		sessionService.destroy(key)
		//destroying headers
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common['Bearer'] = undefined;
		//routing to login page
		$state.go('login',{}, {reload:true});
	}
	//retreiving username to display on Navbar
	var username = sessionStorage.getItem('user');
	if (username) $scope.userName = username
	$scope.footdt = new Date();
	
	
}])