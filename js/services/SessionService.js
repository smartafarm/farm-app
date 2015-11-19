.factory('sessionService', ['LoginService','$interval','$rootScope', function(LoginService,$interval,$rootScope){
	return {
			set:function(key,value){
				return sessionStorage.setItem(key,value);
			},
			get:function(key){
				return sessionStorage.getItem(key);
			},
			destroy:function(){
				//cancelling the update timer
				$rootScope.$broadcast('timerEvent:stopped');
			//	$interval.cancel($scope.timer);
				var key = sessionStorage.getItem('user');
				LoginService.destroy(key);
				sessionStorage.removeItem('user');		
				sessionStorage.removeItem('reqTok');
				return;
			}
		}
	
}])