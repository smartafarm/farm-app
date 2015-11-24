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
				/*testCtrl.callGraph();*/
			});
		}
	}
	
}])
.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {
	
	 $scope.click=function(){
	 	 $scope.graphTemprature[0].data.rows.push({'c' :[{'v' : "7:18 PM"},{'v' : 2.5}]});
	 }
	
	    $scope.trigger =function(){
  	 	//triggering resize fro proper graph display
  			 $rootScope.$emit('resizeMsg');  	 
  }
    /* Controllers */

})