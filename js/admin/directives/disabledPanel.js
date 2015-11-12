.directive('disabledPanel', ['Notification',function (Notification) {
	return {
		restrict: 'A',
		link: function (scope, elm, attr) {
			elm.bind('click',function(){
			/*	console.log(scope);
				
			if (!scope.selectedDevices || !scope.selectedDevices[scope.$index]._id === undefined || scope.selectedDevices[scope.$index]._id.length == 0)	{
				Notification.warning({message: 'Please enable the device first', delay: 3000});
			}*/
			})
			
		}
	};
}])