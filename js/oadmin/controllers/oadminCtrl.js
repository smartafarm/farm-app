angular.module('sfarm')
.controller('oadminCtrl', ['$scope','$rootScope','$interval','$state' ,function($scope,$rootScope,$interval,$state) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents(); 

}])
