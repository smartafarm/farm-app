.directive('editOrgDevice',function(Notification,$uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(){
				if(scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select an organisation ', delay: 3000});
				}else{
					$uibModal.open({
				      animation: true,
				      templateUrl: 'admin/templates/editDeviceModal.html',
				      controller: 'editOrgDeviceCtrl',	
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