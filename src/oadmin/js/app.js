angular.module('sfarm')
.directive('addorgUser',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'oadmin/templates/addUserModal.html',
		      controller: 'addorgUserCtrl',
		      resolve:{parent : function(){return scope}}			    
	        });
			})
		}
	}

}) //eof devicedata

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

.controller('addorgUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'oadminService',	
  'Notification',
  'parent',  
function ($scope,$uibModalInstance,$interval,oadminService,Notification,parent) {  

	$scope.user ={};
  //initialize existing details for form
  if(!$scope.user.details){
    $scope.user.details = {};
    $scope.user.details.address = {};
  }
  if(!$scope.user.details){   
    $scope.user.details.address = {};
  }
  $scope.user.details.address.a1= parent.info.address.add1;
   $scope.user.details.address.town= parent.info.address.sub;
   $scope.user.details.address.state= parent.info.address.state;
   $scope.user.details.address.pocode= parent.info.address.pocode;
   $scope.user.details.bname= parent.info.name;

// button commands
  $scope.ok = function() {    
    //create user for organisation
  		oadminService.submit('oadmin/createUser',$scope.user).then(function(response){
        if(response.status == 202){
            Notification.error({message : 'Device Settings Updated Failed. Please try again' ,delay : 3000})
          }else
          {       
            parent.myData.push(
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

}])

.controller('editouserDeviceCtrl',[
	'$scope',
	'$uibModalInstance',
	'devices',
	'oadminService',
	'Notification',
function ($scope,$uibModalInstance,devices,oadminService,Notification) {  
  console.log($scope);

	$scope.selectedDevices = {};
	oadminService.getData('oadmin/getDeviceFunc').then(function(response){
  			$scope.dfunc = response;  			
  		},function(response){				
				console.log(response);
		});
  var username = $scope.$parent.user.uname
	oadminService.getData('oadmin/getoadminDevices/'+username).then(function(response){
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

	
	
  	$scope.ok = function() {  
  		
  		var data = {};
  		
  		data.uname = devices[0].uname;  
  		data.dAccess ={};
  		angular.forEach($scope.selectedDevices,function(value,key){
  			if(value.status == true){
  				data.dAccess[key] = value;
  			}
  		})
  		
  		
  		
  			oadminService.submit('oadmin/setDeviceAccess',data).then(function(response){  	
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
angular.module('sfarm')
.controller('oadminCtrl', ['$scope','$rootScope','$interval','$state' ,function($scope,$rootScope,$interval,$state) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents(); 

}])

.controller('ouserCtrl', ['$scope','oadminService', '$rootScope',function ($scope,oadminService,$rootScope) {
  $scope.loading = true;

  $scope.info = {};  
  if(!$rootScope.user){
    $rootScope.getuser.then(function(response){
      $rootScope.user = response;
      $scope.loading = false;
    })
  }else{
    $scope.loading = false
  }

	oadminService.getData('oadmin/getUsers').then(function(response){
      //gettting user data
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

oadminService.getData('oadmin/getOrg/info').then(function(response){
  //getting organisation info
  if(response)    $scope.info = response[0];
})



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
      	 { field: 'Phone No' }	      
	      ] 
	  }
      $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);
      }
  
}])
.factory('oadminService', ['$http','$q', function($http,$q){
	return {
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://localhost/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		getData : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://localhost/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'GET',
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