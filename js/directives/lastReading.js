.directive('lastReading',function(){
	return{
		restrict:'A',	
		link : function(scope,ele,attr){	
			var dates=[];
			var readings = scope.data[scope.$index].readings;
			readings.forEach(function(value,key){
				//console.log(value);
				dates.push(new Date(value.dt));
			})
			var maxDate=new Date(Math.max.apply(null,dates));
			scope.data[scope.$index].lread =maxDate;
		}
	}

}) //eof devicedata
	