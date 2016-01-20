.directive('manageAsset',function(Notification,$uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(){
				if(scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please Select a Device ', delay: 3000});
				}else{
					$uibModal.open({
						animation: true,
						backdrop : 'static',
						templateUrl: 'admin/templates/manageAssetCtrlModal.html',
						controller: 'manageAssetCtrl',	
						resolve:{
							device : function(){			      						
								return scope.gridApi.selection.getSelectedRows(0);
							}	
						}    
					});
					
				}
			})
		}

	}
})