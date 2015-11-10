.controller('adminCtrl', ['$rootScope','$interval' ,function($rootScope,$interval) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents();
}])