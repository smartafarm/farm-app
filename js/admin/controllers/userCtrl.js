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