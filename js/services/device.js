.factory('device',['$http','reqInspect',function($http,reqInspect){
return{
		all:function(){
				   return $http({
            headers: { 'Content-Type': 'application/json' },
            url:'http://www.smartafarm.com.au/api/fetch/getdevices',
            method :'GET'
            }).then(function(response)
					{
                        //reqInspect.submitResposne(response.status);
						return response.data;
					})
				}
   }	
}])// eof getdevices
.factory('Poller', function($http,$q,reqInspect){
               return {
                    poll : function(api){
                        var deferred = $q.defer();
                        $http.get(api).then(function (response) {                            
                            deferred.resolve(response.data);
                        },function(response){
                           return deferred.reject() ;//reqInspect.submitResposne(response.status) ;                           
                        });
                        return deferred.promise;
                       
                    }

                }
            })



