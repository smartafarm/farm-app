.factory('LoginService', ['$http','$q', function($http,$q){
	//Factory for user login
	return {
		login : function(credentials){
		//main login function to set user credentials
			var deferred = $q.defer();
			$http({
				//setting headers
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				//url:'http://www.smartafarm.com.au/api/login/authenticate',				
				url:'http://localhost/api/login/authenticate',		
				method:'POST',
				data: {credentials:credentials}
			}).then(function(response){
				
				if(response){
								//setting sessions in browser
								sessionStorage.setItem('user',response.data.id) ;
								sessionStorage.setItem('reqTok',response.data.token) ;
								
								
							}
					deferred.resolve(response);
				
			},function(reject){
				
				deferred.reject(reject);
			});
		 	return deferred.promise
		},

		isAuth : function(token,id){
		//authorize token on each request			
			var deferred = $q.defer();
			$http({
				url:'http://www.smartafarm.com.au/api/login/validate',
				method:'POST',
				data: {data:{'user' : id , 'token' : token}}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			},

		destroy : function(key){
		//destroy token and user credentials
			var deferred = $q.defer();
			$http({
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/login/destroy',
				method:'POST',
				data: {'user' : key }
			}).then(function(response){
				deferred.resolve();
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			},

		getd : function(api,key){
		//destroy token and user credentials
			var deferred = $q.defer();
			$http({
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/' + api,
				//url:'http://localhost/api/' + api,
				method:'POST',
				data: {'user' : key }
			}).then(function(response){
				deferred.resolve(response);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			}					
		
		}	
		
}])
