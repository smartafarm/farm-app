
var sfarm =angular.module('sfarm');
sfarm
.directive('addNewAlert',function($uibModal){
	//directive to edit friendly name of the device
	//triggers a modal
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
			//open modal
			$uibModal.open({
		      animation: true,
		      templateUrl: 'partials/newAlertModal.html',
		      controller: 'addNewAlertCtrl',
		      resolve:{
		      	//send data of selected device to controller
		      	selectedDevice : function(){
		      		return scope.device; 
		      	},
		      	deviceAlerts : function(){
		      		return scope.alerts; 
		      	}
		      	
		      }
	        });
	        //prevent default click event
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
