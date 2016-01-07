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