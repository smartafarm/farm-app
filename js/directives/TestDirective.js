.directive('testDirective', [function ($scope) {
	return {
		restrict: 'EA',		
		templateUrl:'partials/graph.html'
	}
	
}])
.directive('testDirective1', [function ($scope,$filter) {
	return {
		restrict: 'A',	
		controller:'testCtrl',	
		link:function(scope,ele,att,testCtrl){
			ele.bind('click',function(){
				testCtrl.callGraph();
			});
		}
	}
	
}])
.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope) {
	this.callGraph = function(){
		
		if(!$scope.graph[$scope.$index]){
				console.log($scope);
			mygraphFactory.setValue($scope,$filter,$scope.$index);
			}
			else{
					console.log('here');
					
					 $scope.graph.splice($scope.$index, 1);
					
					console.log($scope);
				}
	}
})