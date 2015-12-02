
var sfarm =angular.module('sfarm');
sfarm
.directive('devicedata',function(){
	//directive to print data from devices into accordion
	return{
		restrict:'E',
    
		scope:{
			reading : '='
		},
		templateUrl : 'partials/reading.php',		
	}

}) //eof devicedata


