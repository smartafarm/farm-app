.run(['$rootScope',
	'$state',
	'LoginService',
	'sessionService',
	'$http',
	'$interval',
function($rootScope,$state,LoginService,sessionService,$http,$interval){	
	
	 

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {
			
			var cancelEvents =function(){
		 	 $interval.cancel($rootScope.timer);
		 }
		 cancelEvents();
	    /*	    
		Validation
		*/
	    if(toState.name !== 'login'){	    
	    	var token = sessionStorage.getItem('reqTok');		    	
	    	var bearer = sessionStorage.getItem('user');		    	
	    	if (token && bearer){
	    		$http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
	    		$http.defaults.headers.get = { 'Content-Type': 'application/json' }
	    		$http.defaults.headers.common['X-Auth-Token'] = token   ;
	    		$http.defaults.headers.common['Bearer'] = bearer			    			    ;
	    	}
	    	else 
	    	{	
	    		event.preventDefault();
	    		sessionService.destroy('user');
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined
	    		$http.defaults.headers.common['Bearer'] = undefined   			    			    
	    		$state.go('login')
	    	};
	    }
	})


}])
