.controller('deviceMgtCtrl', ['$scope','adminService', function ($scope,adminService) {
  
	adminService.getData('admin/getallDevices').then(function(response){
   var data = response;                
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    {
      "id" : value._id,
      "name" : value.name,
      "desc" : value.Desc,
      "status" : value.Status ,
      "sensors" :value.sensor,
      "asset":value.asset
      
    })
    
  })
 },function(response){				
				//console.log(response);
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
   { field: 'id' ,displayName:'ID' , width: 160  }	,
   { field: 'name',displayName:'Name' }	,
   { field: 'desc',displayName:'Description' }	,
   { field: 'status' ,displayName:'Status',
   width: 120,                
   cellTemplate: '<p><i class = "fa" '+
   ' ng-class="{\'fa-check\': row.entity.status == 1 , \'fa-times\': row.entity.status != 1 }" '+ 
   'style="color:{{row.entity.status==1 ? \'green\' : \'red\'}}"'+
   'uib-tooltip ="{{row.entity.status==1 ? \'Active\' : \'Inactive\'}}" tooltip-popup-delay="400" tooltip-placement="left"></i></p>',
   
   
 }
 
 ] 
}
$scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);

    }
    
  }])