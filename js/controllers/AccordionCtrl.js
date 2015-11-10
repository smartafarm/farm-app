.controller('uib-accordion',
	['$scope',
	'device',
	'notify',
	'Poller',
	'$rootScope',
	'$timeout',
	'$state',
	'$interval',
	'$filter',
	'mygraphFactory',
	function($scope,device,notify,Poller,$rootScope,$timeout,$state,$interval,$filter,mygraphFactory){
	$scope.flag = true;
	$scope.newdata = null;
	$scope.graph = [];
	$scope.data = device.all().then
		(function(data){
			$scope.data=data;
			// setting angular js data angular js graph
			//-----------------------------------------------------------------------//
			mygraphFactory.setGraph($scope,$filter);
			return
		});
	function Repeater ()  {
		//Polling for new data
		 Poller.poll('http://localhost/smartfarm/fetch/getupdate?t='+ new Date().toISOString())
		 .then(function(data){
		 	var index = 0;
	 		$scope.data.forEach(function(entry) {
	 		data.readings.forEach(function(reading){
	 			if(reading.did == entry._id){
	 				$scope.data[index].readings.push(reading);
	 				console.log(reading);
	 				// refreshing angular js graph
	 				mygraphFactory.setGraph($scope,$filter);
	 			//-----------------------------------------------------------------------//
	 				/*$scope.graph[index][0].x.push($filter('date')(reading.dt, 'HH:mm'));
	 				$scope.graph[index][0].y[0].push(reading.T01);
	 				$scope.graph[index][0].z[0].push(reading.L01);
	 				console.log($scope.graph);*/
	 				$interval( notify({ message:'New Reading Received From Device ' + $scope.data[index].name , duration:'10000',position:'right' } ), 1000);
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
