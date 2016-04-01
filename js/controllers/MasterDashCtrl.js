.controller('dashboardMasterCtrl', [
	'$scope',
	'device',
	'$rootScope',
	'mygraphFactory',
	'$filter',
	'$window',
	'$interval',
	'Poller',

 function ($scope,device,$rootScope,mygraphFactory,$filter,$window,$interval,Poller) {
 	
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

function Repeater ()  {	 
		// Poller.poll('fetch/getupdate?t='+ new Date().toISOString())
		
		//Poller.poll('fetch/getupdate?did='+$scope.device._id+'&t=01042016090034')
		Poller.poll('fetch/getupdate?did='+$scope.device._id+'&t='+moment().format("DDMMYYYYHHmmss"))
		 .then(function(response){
		 	
		/* 	var index = 0;
		 	//for each new reading from server
	 		$scope.data.forEach(function(entry) {
	 		data.readings.forEach(function(reading){
	 			if(reading.did == entry._id){
	 				//pushing into device data
	 				$scope.data[index].readings.push(reading);	 				
	 				// updating last read	 				
					$scope.data[index].lread =reading;
	 				// refreshing angular js graph
	 				
	 				Notification.info({ title:'New Reading', message: $scope.data[index].name , delay:4000 }) ;
	 			}
	 		})
	 		index = index+1;
			});*/
	 	});
};
$rootScope.timer = $interval(Repeater, 11000);	

$scope.$on('timerEvent:stopped', function() {
		// cancel event of timer when page is redirected 
	$interval.cancel($rootScope.timer);
});
	$rootScope.getuser.then(function(response){
		$rootScope.user = response;				
	})

	
}])