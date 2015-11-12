.directive('editDevice',function(Notification,$uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(){
				if(scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please Select a User to edit Device Settings', delay: 3000});
				}else{
					$uibModal.open({
				      animation: true,
				      templateUrl: 'admin/templates/editDeviceModal.html',
				      controller: 'editDeviceCtrl',	
				      resolve:{
		      				devices : function(){	
		      						
						      		return scope.gridApi.selection.getSelectedRows(0);
		      				}	
	      				}    
			        });
					
				}
			})
	}

}
})