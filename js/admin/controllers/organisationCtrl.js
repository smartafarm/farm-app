
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
  						"type" : value.type.substring(0,1).toUpperCase() + value.type.slice(1),
              "devices" : value.device
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
