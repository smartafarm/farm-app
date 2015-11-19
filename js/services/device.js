.factory('device',['$http','$q','reqInspect',function($http,$q,reqInspect){
return{
		all:function(credentials){
            var deferred = $q.defer();
            $http({
                url:'http://www.smartafarm.com.au/api/fetch/getdevices',
               // url:'http://www.smartafarm.com.au/api/fetch/getdevices',
                method:'GET'
            }).then(function(response){
                deferred.resolve(response.data)
            },function(reject){
                deferred.reject(reject);
            });
            return deferred.promise
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



