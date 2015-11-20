.directive('lastReading',function(){
	return{
		restrict:'A',	
		link : function(scope,ele,attr){	
			var dates=[];
			var readings = scope.data[scope.$index].readings;
			readings.forEach(function(value,key){
				dates.push(new Date(value.dt));
			})
			var maxDate=Math.max.apply(null,dates);
			scope.data[scope.$index].lread =new Date(maxDate);			

			readings.forEach(function(value,key){	

				if(new Date (value.dt).getTime() === new Date(maxDate).getTime() ){					
					scope.data[scope.$index].lread = value ;			
				}
				
			})
		}
	}

}) //eof devicedata
	