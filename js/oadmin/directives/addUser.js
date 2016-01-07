angular.module('sfarm')
.directive('addorgUser',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'oadmin/templates/addUserModal.html',
		      controller: 'addorgUserCtrl',
		      resolve:{parent : function(){return scope}}			    
	        });
			})
		}
	}

}) //eof devicedata
