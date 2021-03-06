//Main application Javascript
var sfarm = angular
.module('sfarm', [
//dependencies
'ui.router',
'ui.bootstrap',
'cgNotify',
'ngAnimate',
'oc.lazyLoad',
'ui.grid',
'ui.grid.selection',
'ui-notification',
'checklist-model',
'ui.grid.resizeColumns',
'ui.grid.pagination',
'googlechart',
'ngMaterial',
'ngAria',
'angularUtils.directives.dirPagination',
'checklist-model',
'ui.grid.exporter',
'rzModule'

])
// User Role profiles
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',  
  guest: 'guest'
})

.config(function($httpProvider) {
  //pushing request interceptor for server
  $httpProvider.interceptors.push('reqInspect');
})
.filter('ucf', function()
{
    //filter to convert text into sentence case
   
    return function(word)
    {
       if(word)
      {
          return word.substring(0,1).toUpperCase() + word.slice(1);
      }
    }
})
.filter('valueFilter', function()
{
  //filter to display values of readings
    return function(word)
    {
        //console.log(word);
        var label = word.id;        
        
        //var indidcate = word.value.substring(0, 1);
        if (word.type==='Temp'){
          //var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + word.value +' ℃ ';//&#8451  °C
        }else if(word.type==='Level')
        {
          //var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + word.value + ' % '
        }else{
        //  var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + word.value 
        }
        
    }
})
.filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    if(text)
    {
      //custom filter to get string into date object for formatting
      var  tempdate= new Date(text.replace(/-/g,"/"));
      return $filter('date')(tempdate, "dd-MM-yyyy h:mm a");
    }
  }
})
.config(['$animateProvider', function($animateProvider) {
      //configuartion to animate accordion for UIB ANGULAR BOOTSTRAP
      $animateProvider.classNameFilter(/^((?!(ui-grid-menu)).)*$/);
  }
])
