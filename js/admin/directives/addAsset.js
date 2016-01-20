angular.module('sfarm')
.directive('addnewDevice',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'admin/templates/addNewDeviceModal.html',
		      controller: 'addNewDeviceCtrl',
		      resolve:{
		      				myData : function(){	
		      						
						      		return scope.myData;
		      				}	
	      				} 			    
	        });
			})
		}
	}

}) //eof devicedata
