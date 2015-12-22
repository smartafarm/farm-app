angular.module('sfarm')
.directive('addOrg',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'admin/templates/addOrgModal.html',
		      controller: 'addOrgCtrl',
		      resolve:{
		      				myData : function(){	
		      						//providing data to add new org in table
						      		return scope.myData;
		      				}	
	      				} 			    
	        });
			})
		}
	}

}) //eof devicedata
