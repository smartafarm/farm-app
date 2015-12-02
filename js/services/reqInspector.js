.factory('reqInspect',['$injector',
	//factory to intercept each request
	function($injector){
	return{	
	//intercepting response error
	 responseError: function(rejection) {
        if (rejection.status === 401) {         
    	//if response status 401 then route to login and destroy credentials
         var sessionService = $injector.get('sessionService');
         var $http = $injector.get('$http');
         var $state = $injector.get('$state');
				sessionService.destroy();
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined;
	    		$http.defaults.headers.common['Bearer'] = undefined;   			    			    
	    		$state.go('login')    ;    	
          };
        }
    }
	

}])
