.factory('LoginService', ['$http','$q', function($http,$q){
	return {
		login : function(credentials){
			var deferred = $q.defer();
			$http({
				url:'http://localhost/smartfarm/login/authenticate',
				method:'POST',
				data: {credentials}
			}).then(function(response){
				sessionStorage.setItem('user',response.data.id) ;
				sessionStorage.setItem('reqTok',response.data.token) ;
							
				deferred.resolve(response.data);
			},function(response){
				console.log(response.status);
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
		},
		isAuth : function(token,id){
			var deferred = $q.defer();
			$http({
				url:'http://localhost/smartfarm/login/validate',
				method:'POST',
				data: {data:{'user' : id , 'token' : token}}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		destroy : function(id){
			var deferred = $q.defer();
			$http({
				url:'http://localhost/smartfarm/login/destroy',
				method:'POST',
				data: {'user' : id }
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			}					
		}
}])