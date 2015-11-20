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
	$scope.flag = true;
	$scope.newdata = null;
	$scope.graph = [];
	$scope.isLoading =true;
	$scope.data = device.all().then
		(function(data){
			$scope.data=data;		
			mygraphFactory.setGraph($scope,$filter);
			$scope.isLoading =false;
			return
		});
	function Repeater ()  {
		//Polling for new data
		 //Poller.poll('http://www.smartafarm.com.au/api/fetch/getupdate?t='+ new Date().toISOString())
		 Poller.poll('http://www.smartafarm.com.au/api/fetch/getupdate?t='+ new Date().toISOString())
		 .then(function(data){
		 	var index = 0;
	 		$scope.data.forEach(function(entry) {
	 		data.readings.forEach(function(reading){
	 			if(reading.did == entry._id){
	 				
	 				$scope.data[index].readings.push(reading);	 				
	 				// setting last read	 				
					$scope.data[index].lread =reading;
	 				// refreshing angular js graph
	 				mygraphFactory.setValue($scope,$filter,index);	 
	 				Notification.info({ title:'New Reading', message: $scope.data[index].name , delay:4000 }) ;
	 			}
	 		})
	 		index = index+1;
		});
		 });
	};
	$rootScope.timer = $interval(Repeater, 11000);
	$scope.$on('timerEvent:stopped', function() {
		$interval.cancel($rootScope.timer);
	});
   $scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   		//console.log(MyDate);
   	    return MyDate;
   	}
  };
}])
