.directive('lastReading',function(){
	//directive to print last reading on accordion panel header
	return{
		restrict:'A',	
		link : function(scope,ele,attr){	
			//date comparision for currently available 
			
			scope.$watch('device', function(){
				var dates=[];
						var readings = scope.device.readings;
						readings.forEach(function(value,key){
							dates.push(new Date(value.dt));
						})
						var maxDate=Math.max.apply(null,dates);
						scope.device.lread =new Date(maxDate);			
			
						readings.forEach(function(value,key){	
			
							if(new Date (value.dt).getTime() === new Date(maxDate).getTime() ){		
								//setting last read for each device			
								scope.device.lread = value ;			
							}
						})
				
			},true)
		}
	}

}) //eof devicedata
	