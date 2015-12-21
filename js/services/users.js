.factory('userFactory', ['$http','$q', function($http,$q){
	//factory to sending and receiving information
	return {
		receive : function(api){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/api/'+api,
				//url:'http://www.smartafarm.com.au/api/'+api,
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
				url:'http://localhost/api/'+api,
				//url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])