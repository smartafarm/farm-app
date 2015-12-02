.directive('deviceSwitch',function(){
	// directive to enable/disable device status
	return{
		restrict:'A',	
		controller:'deviceStatusCtrl',		
		
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){	
			//preventing the derfault click event				
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
			
