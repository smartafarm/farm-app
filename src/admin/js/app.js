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
function ($scope,$uibModalInstance,$interval) {  
	
	$scope.user ={};

  	$scope.ok = function() {    
  		console.log($scope.user);
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