.directive('googleGraph', [function ($scope,$window,$timeout) {

	return {
		restrict: 'EA',		
		templateUrl:'partials/googlegraph.html',
        controller : 'testCtrl'
	}
		
 		
}])


.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {	
	
	    $scope.trigger =function(){
  	 	//triggering resize fro proper graph display
  			 $rootScope.$emit('resizeMsg');  	 
  }})


