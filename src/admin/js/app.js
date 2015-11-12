angular.module("sfarm")
.directive('addUser',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'admin/templates/addUserModal.html',
		      controller: 'addUserCtrl',
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

.directive('disabledPanel', ['Notification',function (Notification) {
	return {
		restrict: 'A',
		link: function (scope, elm, attr) {
			elm.bind('click',function(){
			/*	console.log(scope);
				
			if (!scope.selectedDevices || !scope.selectedDevices[scope.$index]._id === undefined || scope.selectedDevices[scope.$index]._id.length == 0)	{
				Notification.warning({message: 'Please enable the device first', delay: 3000});
			}*/
			})
			
		}
	};
}])
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

.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
	'myData',
function ($scope,$uibModalInstance,$interval,adminService,myData) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		adminService.submit('admin/createUser',$scope.user).then(function(response){
  				myData.push(
  					{
  						"First Name" : $scope.user.details.fname,
  						"Last Name" : $scope.user.details.lname,
  						"User Name" : $scope.user.uname,
  						"Email" : $scope.user.details.email,
  						"Organisation" :$scope.user.details.bname,
  						"Phone No" :$scope.user.details.pno  	,					 
  						"devices": []

  					})
  		},function(response){				
				console.log(response);
		});
  		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	console.log('here');

}])

.controller('adminCtrl', ['$rootScope','$interval' ,function($rootScope,$interval) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents();
}])
.controller('editDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'userFactory',
	'Notification',
function ($scope,$uibModalInstance,devices,userFactory,Notification) {  
	
	userFactory.receive('admin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
	userFactory.receive('admin/getAllDevices').then(function(response){
  			$scope.data = response;  	  					
  			$scope.selectedDevices=[];
  			
		if(devices[0].devices){
  			$scope.selectedDevices = devices[0].devices
  		}

  		
  		},function(response){				
				console.log(response);
		});



// eof testing
	
	
  	$scope.ok = function() {  
  		devices[0].devices = $scope.selectedDevices;
  		var data = {};
  		data.uname = devices[0].uname;
  		data.dAccess = $scope.selectedDevices; 
  		console.log(data);
  			userFactory.submit('admin/setDeviceAccess',data).then(function(response){  				
  				//$uibModalInstance.dismiss('cancel');
  				Notification.success({message : 'Device Settings Updated' ,delay : 3000})	
  			},function(response){				
				console.log(response);
			});
  		
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])
.controller('userCtrl', ['$scope','userFactory', function ($scope,userFactory) {
	$scope.editDevice = function(row){
		console.log(row);
	}
	userFactory.receive('admin/getUsers').then(function(response){
  			var data = response;
        
  			$scope.myData = [];
  			data.users.forEach(function(value,key){  				
  				$scope.myData.push(
  					{
  						"First Name" : value.details.fname,
  						"Last Name" : value.details.lname,
  						"uname" : value.uname,
  						"Email" : value.details.email,
  						"Organisation" :value.details.bname,
  						"Phone No" :value.details.pno  	,					 
  						"devices": value.devices

  					})
          
  			})
  		},function(response){				
				console.log(response);
		});
	 $scope.gridOptions = {	    
	      data: 'myData',
	        enableGridMenu: true,
	        enableRowSelection: true,		    
	    	selectionRowHeaderWidth: 35,
		    rowHeight: 35,
		    
	      columnDefs:[
  			 { field: 'First Name' }	,
          	 { field: 'Last Name' }	,
          	 { field: 'uname',displayName:'User Name' }	,
          	 { field: 'Email' }	,
          	 { field: 'Organisation' }	,
          	 { field: 'Phone No' }	      
	      ] 
	  }
      $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);
      }
    
//testing


	/*$scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney"
        }
        ]
        console.log($scope.myData);*/
}])
.factory('adminService', ['$http','$q', function($http,$q){
	return {
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'POST',
				data: {serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])
.factory('userFactory', ['$http','$q', function($http,$q){
	return {
		receive : function(api){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'GET'				
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'POST',
				data: {serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])