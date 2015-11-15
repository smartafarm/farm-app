.controller('adminCtrl', ['$rootScope','$interval','$state' ,function($rootScope,$interval,$state) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents();
 $state.go('admin.users');  
}])