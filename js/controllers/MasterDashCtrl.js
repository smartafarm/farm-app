.controller('dashboardMasterCtrl', [
	'$scope',
	'device',
	'$rootScope',
	'mygraphFactory',
	'$filter',
	'$window',
 function ($scope,device,$rootScope,mygraphFactory,$filter,$window) {
 	
 	$scope.listData = [];
	$scope.isLoading = true;	
	$scope.graphLoading = true;
	$scope.changeCall  = true;
	device.all().then(function(data){
		$scope.data = data;
		$scope.isLoading = false;
		$scope.device = $scope.data[0]
		
		
	})
  $scope.graphready = function(test){
  				
				$scope.graphLoading = false;	
				
				if($scope.changeCall){
					//if device is changed resize is called to adjust graph correctly
					$scope.trigger();
					$scope.changeCall = false;
				}
                };
$scope.getGraph = function(){	
	//variable to trigger the graph resize message
	$scope.changeCall = true

	if($scope.device.readings.length > 0) 
		{
			mygraphFactory.getGraph($scope).then(function(){		
			})
			
		}

}
	    $scope.trigger =function(){
  	 	//triggering resize for proper graph display when accordion header is clicked
  			 $rootScope.$emit('resizeMsg');  	 
  }
$scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   	
   	    return MyDate;
   	}

  };
  
}])