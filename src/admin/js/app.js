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

angular.module('sfarm')
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

.controller('addOrgCtrl',[
	'$scope',
  'adminService',
  'myData',
  'Notification',
  '$uibModalInstance',
	
function ($scope,adminService,myData,Notification,$uibModalInstance) {  
	
$scope.user ={};

  	$scope.ok = function() {          
      
  		adminService.submit('admin/createOrg',$scope.org).then(function(response){
      if(response.status == 202){
            Notification.error({message : 'Creation Failed . Please try again' ,delay : 3000})
          }else
          {       
          myData.push(
            {
              "Name" : $scope.org.name,
              "cperson" : $scope.org.cperson,
              "Phone No" :$scope.org.pno ,          
              "Email" : $scope.org.email,
              "add" : $scope.org.address.add1 + ' ' + $scope.org.address.sub + ' ' + $scope.org.address.state + ' ' + $scope.org.address.pocode
            })
            Notification.success({message : 'Organisation Added' ,delay : 3000})
          }
  		},function(response){				
				console.log(response);
		});
  		$uibModalInstance.dismiss('cancel');
	};
	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])


.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
	'myData',
  'Notification',
function ($scope,$uibModalInstance,$interval,adminService,myData,Notification) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		adminService.submit('admin/createUser',$scope.user).then(function(response){
        if(response.status == 202){
            Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
          }else
          {       
            myData.push(
            {
              "First Name" : $scope.user.details.fname,
              "Last Name" : $scope.user.details.lname,
              "uname" : $scope.user.uname,
              "Email" : $scope.user.details.email,
              "Organisation" :$scope.user.details.bname,
              "Phone No" :$scope.user.details.pno   ,          
              "devices": []

            })
            Notification.success({message : 'User Added' ,delay : 3000})
          }
  				
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

.controller('adminCtrl', ['$scope','$rootScope','$interval','$state' ,function($scope,$rootScope,$interval,$state) {
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
	$scope.test = true;
	$scope.selectedDevices = {};
	userFactory.receive('admin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
	userFactory.receive('admin/getAllDevices').then(function(response){
  			$scope.data = response;  	  				

  			
  
  		$scope.data.forEach(function(deviceProp,value){ 
         
  			if(devices[0].devices[deviceProp._id]){

  				if(devices[0].devices[deviceProp._id].status == true){
					$scope.selectedDevices[deviceProp._id] = devices[0].devices[deviceProp._id]  					

          if(!devices[0].devices[deviceProp._id].func){            
            $scope.selectedDevices[deviceProp._id].func = [];
          }
        }
				}
          
  			else{
				$scope.selectedDevices[deviceProp._id] = {'status' : false , 'func' : []}  				
  			}
  			
  		})
  		console.log($scope.selectedDevices);
  		},function(response){				
				console.log(response);
		});
$scope.changeAlert = function(device,test){
	console.log($scope.selectedDevices);
	
}
$scope.changeFunc =function(device ,funct){
  
	var index = $scope.selectedDevices[device].func.indexOf(funct);
	if($scope.selectedDevices[device].func.indexOf(funct) == -1){
		$scope.selectedDevices[device].func.push(funct);
	}else{
		$scope.selectedDevices[device].func.splice(index,1);
	}
	console.log($scope.selectedDevices);
}

// eof testing
	
	
  	$scope.ok = function() {  
  		
  		var data = {};
  		
  		data.uname = devices[0].uname;  
  		data.dAccess ={};
  		angular.forEach($scope.selectedDevices,function(value,key){
  			if(value.status == true){
  				data.dAccess[key] = value;
  			}
  		})
  		
  		console.log(data);
  		
  			userFactory.submit('admin/setDeviceAccess',data).then(function(response){  	
  				if(response.status == 202){
  					Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
  				}else
  				{				
					devices[0].devices = $scope.selectedDevices;
					$uibModalInstance.dismiss('cancel');
					Notification.success({message : 'Device Settings Updated' ,delay : 3000})	
				}
  			});  	
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	

}])

.controller('orgCtrl',[
	'$scope',
	'userFactory',
function ($scope,userFactory) {  	
		userFactory.receive('admin/getorg').then(function(response){
  			var data = response;      
  			
  			$scope.myData = [];
  			data.forEach(function(value,key){  		

  				$scope.myData.push(
  					{
  						"Name" : value.name,
  						"cperson" : value.cperson,
  						"Phone No" :value.pno ,					 
  						"Email" : value.email,
  						"add" : value.address.add1 + ' ' + value.address.sub + ' ' + value.address.state + ' ' + value.address.pocode,
  						"type" : value.type.substring(0,1).toUpperCase() + value.type.slice(1)
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
        rowWidth : 20,
		    enableColumnResizing : true,
        paginationPageSizes: [10, 20, 30],
        paginationPageSize: 10,
	      columnDefs:[
		 { field: 'Name' }	,      	 
      	 { field: 'cperson',displayName:'Contact Person' }	,
      	 { field: 'Email' ,width: 200}	,
      	 { field: 'add',displayName:'Address' }	,
      	 { field: 'Phone No' }	  ,
      	 { field: 'type',displayName:'Type' }    
	    ] 
	  }
      $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);
      }
 
}])

.controller('userCtrl', ['$scope','userFactory', function ($scope,userFactory) {
  
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
  						"devices": value.device

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
        rowWidth : 20,
		    enableColumnResizing : true,
        paginationPageSizes: [10, 20, 30],
        paginationPageSize: 10,
	      columnDefs:[
  			 { field: 'First Name' }	,
      	 { field: 'Last Name' }	,
      	 { field: 'uname',displayName:'User Name' }	,
      	 { field: 'Email' ,width: 200}	,
      	 { field: 'Organisation' }	,
      	 { field: 'Phone No' }	      
	      ] 
	  }
      $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);
      }
 
}])
.factory('adminService', ['$http','$q', function($http,$q){
	return {
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/api/'+api,
				//url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])