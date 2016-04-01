.directive('lastReading',function($filter){
	//directive to print last reading on accordion panel header
	return{
		restrict:'A',	
		link : function(scope,ele,attr){	
			//date comparision for currently available 
			
			scope.$watch('device', function(){
				var dates=[];
						var readings = scope.device.readings;
						readings.forEach(function(value,key){
							dates.push(new Date(value.dt.replace(/-/g, "/")));
						})
						var maxDate=Math.max.apply(null,dates);
						scope.device.lread =new Date(maxDate);			
			
						readings.forEach(function(value,key){	
			
							if(new Date (value.dt.replace(/-/g, "/")).getTime() === new Date(maxDate).getTime() ){		
								//setting last read for each device		
								
								scope.device.lread = value ;
								

							}
						})
						
				/*var dates=[];
						var readings = scope.device.readings;
						readings.forEach(function(value,key){
							dates.push( Date(value.dt));
						})
						var maxDate=Math.max.apply(null,dates);
						scope.device.lread = Date(maxDate);			
			
						readings.forEach(function(value,key){	
			
							if( Date (value.dt).getTime() ===  Date(maxDate).getTime() ){		
								//setting last read for each device			
								scope.device.lread = value ;			
							}
						})*/
				
			},true)
		}
	}

}) //eof devicedata
	