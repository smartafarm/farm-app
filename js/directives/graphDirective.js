.directive('googleGraph', [function ($scope) {
//directive to print google annotation graph
	return {
		restrict: 'EA',		
		templateUrl:'partials/googlegraph.html',
        controller : 'testCtrl',
        link:function(scope,attr,elm,testCtrl){
        	if(scope.device.readings){
                        
        		scope.getGraph();
        	}else{
        		
        	}
        }
	}
		
 		
}])
/*
* Controller in directive currently for testing
 */

.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {	
})


