.directive('friendlyName',function($uibModal){
	return{
		restrict:'A',		
		scope:{device : '='}	,		
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'partials/EditFriendlyModal.php',
		      controller: 'FriendlyNameEditorCtrl',
		      resolve:{
		      	selectedDevice : function(){
		      		
		      		var data =scope.$parent.device;
		      		return data
		      	}
		      }
	        });
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
