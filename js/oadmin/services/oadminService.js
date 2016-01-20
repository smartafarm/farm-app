.factory('oadminService', ['$http','$q', function($http,$q){
	return {
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://localhost/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		getData : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://localhost/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'GET',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])