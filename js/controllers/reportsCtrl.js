.controller('reportsCtrl', [
	'$scope',
	'$rootScope',
	'userFactory',
  '$filter',
	
 function ($scope,$rootScope,userFactory,$filter) {
//getting global user properties
$scope.myData = [];
$scope.selAsset =[];
$rootScope.getuser.then(function(response){
	$rootScope.user = response;		
	//Receiving User Devices
	$scope.devices = [];
	var index = 0;
	angular.forEach(response.device,function(value,key){		
		userFactory.receive('fetch/readings/deviceInfo?did='+ key).then(function(response1){
		//setting default selection
		if(index == 0) {
      $scope.sensors = [];
      $scope.device = response1[0];
      angular.forEach($scope.device.asset , function(asset,key){
        angular.forEach(asset.sensor,function(sensor,key1){
          $scope.sensors.push(sensor);
        })
      })
      //fetching data
      $scope.refreshData();

    }
		$scope.devices.push(response1[0]);
		index = index + 1;
		})
	})	
})	





$scope.checkAll = function(){  
  angular.copy($scope.sensors,$scope.selAsset);
}


$scope.uncheckAll = function(){  
  angular.copy([],$scope.selAsset);
}


$scope.refreshData = function(){
  //receivng data
  $scope.loading = true;
  userFactory.receive('fetch/readings/device?did='+$scope.device._id).then(function(response){
  $scope.data =response;  
  //filling data table
  $scope.generateReport();     
  })  
  $scope.sensors = [];
  //creating checklist model
  angular.forEach($scope.device.asset , function(asset,key){
        angular.forEach(asset.sensor,function(sensor,key1){
          $scope.sensors.push(sensor);
        })
      })
  //checking all sensors by default
  $scope.checkAll();  
}


 //setting grid view
  $scope.gridOptions = {      
   data: 'myData',
   enableGridMenu: true,
   enableRowSelection: true,        
   selectionRowHeaderWidth: 35,
   rowHeight: 35,
   rowWidth : 20,
   exporterMenuPdf: false,
   enableColumnResizing : true,
   paginationPageSizes: [50,100,150,200],
   paginationPageSize: 50,
   columnDefs:[
   { field: 'did' ,displayName:'Device' }  ,
   { field: 'date',displayName:'Date',width:140,cellFilter: 'date' } ,
   { field: 'time',displayName:'Time',width:140 }  ,
   { field: 'sensor' ,displayName:'Sensor ID'},
   { field: 'type' ,displayName:'Read Type'},
   { field: 'value' ,displayName:'Read value'}
   ]   
 }
 
 

$scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);

    }

$scope.generateReport = function(){
  //refresing data
  $scope.myData = [];
  
  angular.forEach($scope.data ,function(readings,key){
    angular.forEach(readings.data,function(rdata,key1){
      angular.forEach(rdata.sdata,function(sdata,key2){
        if($scope.selAsset.indexOf(rdata.sensorID) != -1)
        //query filter
        { 
          var dt = new Date(readings.dt.replace(/-/g, "/")); 
          $scope.myData.push(
            {
              "did" : readings.did, //device id
              "date" :$filter('date')(dt,'dd-MM-yyyy'), //date
              "time" :$filter('date')(dt,'shortTime'), //time
              "sensor" : rdata.sensorID , //sensor id
              "type" :sdata.id, // temp or level
              "value":sdata.value  //reading                      
            })//eof mydata push
        }
     })//eof sdata
    })  //eof rdata
  }) // eof readings
$scope.loading = false; 
}


	
}])