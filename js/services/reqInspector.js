.factory('reqInspect',['$injector',
	function($injector){
	return{	
	
	 responseError: function(rejection) {
        if (rejection.status === 401) {         
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
