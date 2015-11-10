.directive('noClick',function(){
	return{
		restrict:'A',		
		
		link : function(scope,ele,attr){

			ele.bind("click",function(event){		
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata
