.factory('UpdateService', ['$http','$q', function($http,$q){
	return {
		deviceStatus : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/smartfarm/'+api,
				method:'POST',
				data: {serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])