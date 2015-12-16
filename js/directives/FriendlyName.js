.directive('friendlyName',function($uibModal){
	//directive to edit friendly name of the device
	//triggers a modal
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
			//open modal
			$uibModal.open({
		      animation: true,
		      templateUrl: 'partials/EditFriendlyModal.php',
		      controller: 'FriendlyNameEditorCtrl',
		      resolve:{
		      	//send data of selected device to controller
		      	selectedDevice : function(){
		      		
		      		var data =scope.$parent.device;
		      		return data
		      	},
		      	graphdata : function(){
		      		
		      		var data =scope.$parent.graph;
		      		return data
		      	},
		      }
	        });
	        //prevent default click event
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
