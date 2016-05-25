// Main dashboard controller
.controller('dashboardMasterCtrl', [
	'$scope',
	'device',
	'$rootScope',
	'mygraphFactory',
	'$filter',
	'$window',
	'$interval',
	'Poller',
	'Notification',
 function ($scope,device,$rootScope,mygraphFactory,$filter,$window,$interval,Poller,Notification) {
 	
 	$scope.listData = [];
	$scope.isLoading = true;	
	$scope.graphLoading = true;
	$scope.changeCall  = true;
	// receiving devices from backend services
	device.all().then(function(data){
		$scope.data = data;
		$scope.isLoading = false;
		$scope.device = $scope.data[0]
		
		
	})

 // triggered when google graph ready	
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

// Date function  
$scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   	
   	    return MyDate;
   	}

  };

// Poller for receiving new values from the devices
function Repeater ()  {	 
		// Poller.poll('fetch/getupdate?t='+ new Date().toISOString())
		
		//Poller.poll('fetch/getupdate?did='+$scope.device._id+'&t=01042016090034')
		Poller.poll('fetch/getupdate?did='+$scope.device._id+'&t='+moment().format("DDMMYYYYHHmmss"))
		 .then(function(response){

		 	if(response.data.readings){

		 		// Adding value to the main scope
	 			if(response.data.readings.length != 0){

 				$scope.data.forEach(function(entry) {
 					
	 			response.data.readings.forEach(function(reading){
		 			if(reading.did == entry._id){
		 				//pushing into device data
		 				entry.readings.push(reading);	 				
		 				// updating last read	 				
						entry.lread =reading;
		 				
			 				
			 				Notification.info({ title:'New Reading', message: entry.name , delay:4000 }) ;
			 			}

		 			})
		 		})

		 		// adding values to google graph
		 		response.data.readings.forEach(function(reading){
				if(reading.did == $scope.device._id){
		 				
		 				reading.data.forEach(function(sinfo){
		 					angular.forEach($scope.graph,function(graphData,key){
		 						if(key == sinfo.sensorID)
		 						 {
		 						 	
		 						 	var dt =  new Date(reading.dt.replace(/-/g, "/")); 
	 		 						 var c=[];
	 		 						 c.push({'v' : dt});
	 		 						 sinfo.sdata.forEach(function(sread){
	 		 						 	c.push({'v' : parseFloat(sread.value)});	
	 		 						 })
	 		 						 
	 		 						graphData.data.rows.push({'c' : c});
	 		 					}
		 					})
		 				})// eof reading data for each
		 				
		 			}
	 			 })
			 	}

			  
			 }
		 	else{
			 		console.log('error');
		 	}

	
	 	});
};
// Timer for fetching new values
$rootScope.timer = $interval(Repeater, 11000);	

$scope.$on('timerEvent:stopped', function() {
// cancel event of timer when page is redirected 
	$interval.cancel($rootScope.timer);
});

// Promise for getting user profile
$rootScope.getuser.then(function(response){
		$rootScope.user = response;				
	})

	
}])