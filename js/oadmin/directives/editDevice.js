.directive('editouserDevice',function(Notification,$uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(){
				if(scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please Select a User ', delay: 3000});
				}else{
					$uibModal.open({
				      animation: true,
				      templateUrl: 'oadmin/templates/editUserDeviceModal.html',
				      controller: 'editouserDeviceCtrl',	
				      resolve:{
		      				devices : function(){	
		      						console.log(scope.gridApi.selection.getSelectedRows(0))
						      		return scope.gridApi.selection.getSelectedRows(0);
		      				}	
	      				}    
			        });
					
				}
			})
	}

}
})