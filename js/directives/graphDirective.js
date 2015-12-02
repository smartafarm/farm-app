.directive('googleGraph', [function ($scope,$window,$timeout) {
//directive to print google annotation graph
	return {
		restrict: 'EA',		
		templateUrl:'partials/googlegraph.html',
        controller : 'testCtrl'
	}
		
 		
}])
/*
* Controller in directive currently for testing
 */

.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {	
	
	    $scope.trigger =function(){
  	 	//triggering resize for proper graph display when accordion header is clicked
  			 $rootScope.$emit('resizeMsg');  	 
  }})


