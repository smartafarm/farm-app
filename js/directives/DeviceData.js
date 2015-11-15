
var sfarm =angular.module('sfarm');
sfarm
.directive('devicedata',function(){
	return{
		restrict:'E',
    
		scope:{
			reading : '='
		},
		templateUrl : 'partials/reading.php',		
	}

}) //eof devicedata


