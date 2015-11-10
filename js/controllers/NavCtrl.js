.controller('NavCtrl', ['$scope', function($scope){
	var username = sessionStorage.getItem('user');
	if (username) $scope.userName = username
}])