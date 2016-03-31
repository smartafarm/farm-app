.controller('uib-accordion',
	['$scope',
	'device',
	'Notification',
	'Poller',
	'$rootScope',
	'$timeout',
	'$state',
	'$interval',
	'$filter',
	'mygraphFactory',
	'$sce',
	function($scope,device,Notification,Poller,$rootScope,$timeout,$state,$interval,$filter,mygraphFactory,$sce){


	
	$scope.isLoading =true;
	$scope.graphLoading = true;
	// pulling data from server for devices
	$scope.data = device.all().then
		(function(data){
			// pushing data into scope
			$scope.data=data;		
			// initializing graph data		  	
			mygraphFactory.googleGraph($scope,$filter)			
			$scope.isLoading =false;
			return
		});

//Polling for new data
	function Repeater ()  {	 
		 Poller.poll('http://www.smartafarm.com.au/api/fetch/getupdate?t='+ new Date().toISOString())
		 .then(function(data){
		 	var index = 0;
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
			});
	 	});
	};

	// initiate Poller for data from server - comment to deactivate and vice versa
	//$rootScope.timer = $interval(Repeater, 11000);
	$scope.$on('timerEvent:stopped', function() {
		// cancel event of timer when page is redirected 
		$interval.cancel($rootScope.timer);
	});

// date filter for log readings	
   $scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   	
   	    return MyDate;
   	}

  };

  //graph on ready event
  $scope.graphready = function(test){
				
		$scope.graphLoading = false;				
    };

}])
