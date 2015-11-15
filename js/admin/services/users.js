.factory('userFactory', ['$http','$q', function($http,$q){
	return {
		receive : function(api){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'GET'				
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'POST',
				data: {serverData}
			}).then(function(response){
				deferred.resolve(response);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])