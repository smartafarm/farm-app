.directive('saveSensor', ['Notification',function (Notification) {
	return {
		restrict: 'A',
		
		link: function (scope, ele, iAttrs) {
			ele.bind('click',function(){	
				scope.checkSensor (scope.$index);			
				
			})
		}
	};
}])