.directive('deviceSwitch',function(){
	return{
		restrict:'A',	
		controller:'deviceStatusCtrl',		
		
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){	
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
			
