angular.module("sfarm")
.directive('addUser',function($uibModal){
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'admin/templates/addUserModal.html',
		      controller: 'addUserCtrl',		    
	        });
			})
		}
	}

}) //eof devicedata


.controller('addUserCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
function ($scope,$uibModalInstance,$interval,adminService) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		adminService.submit('admin/createUser',$scope.user).then(function(response){
  			console.log(response);
  		},function(response){				
				console.log(response);
		});
  		//$uibModalInstance.dismiss('cancel');
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  	console.log('here');

}])

.controller('adminCtrl', ['$rootScope','$interval' ,function($rootScope,$interval) {
 var cancelEvents =function(){
 	 $interval.cancel($rootScope.timer);
 }
 cancelEvents();
}])
.controller('userCtrl', ['$scope', function ($scope) {
	$scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney"
        }
        ]
        console.log($scope.myData);
}])
.factory('adminService', ['$http','$q', function($http,$q){
	return {
		submit : function(api,serverData){
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