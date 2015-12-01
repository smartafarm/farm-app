var sfarm = angular
.module('sfarm', [
'ui.router',
'ui.bootstrap',
'cgNotify',
'ngAnimate',
'nvd3',
'oc.lazyLoad',
'ui.grid',
'ui.grid.selection',
'ui-notification',
'checklist-model',
'ui.grid.resizeColumns',
'ui.grid.pagination',
'googlechart',
//'chart.js',


])
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',  
  guest: 'guest'
})

.config(function($httpProvider) {

  $httpProvider.interceptors.push('reqInspect');
})
.filter('ucf', function()
{
    return function(word)
    {
        return word.substring(0,1).toUpperCase() + word.slice(1);
    }
})
.filter('valueFilter', function()
{
    return function(word)
    {
        //console.log(word);
        var label = word.id;        
        
        var indidcate = word.value.substring(0, 1);
        if (word.type==='Temp'){
          var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + wordValue +' ℃ ';//&#8451  °C
        }else if(word.type==='Level')
        {
          var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + wordValue + ' % '
        }else{
          var wordValue  = parseFloat(word.value)/10 ;
          return label + ' : '   + wordValue 
        }
        
    }
})
/*.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    
    ChartJsProvider.setOptions({
   		scaleBeginAtZero: true
     
    });


   
  }])*/
  .config(['$animateProvider', function($animateProvider) {
          $animateProvider.classNameFilter(/^((?!(ui-grid-menu)).)*$/);
      }
  ]);

var sfarm =angular.module('sfarm');
sfarm
.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller : 'LoginCtrl',
                data :{}
            })
            .state('app', {
                url: '/',   
                templateUrl: "index.html",
                controller: "AppCtrl"
              
            })
            .state('app.dashboard' ,{
                url: 'app/dashboard',
                templateUrl: 'templates/dashboard.html' ,
                controller :'DashboardCtrl',
                parent:'app'
            })
              .state('app.rawdata' ,{
                url: 'app/rawdata',
                templateUrl: 'templates/rawdata.html' ,
                controller :'rawDataCtrl',
                parent:'app'
            })
           .state('admin' ,{
            url: '/admin',
            templateUrl: 'admin/test.html',
            controller:'adminCtrl',
            resolve: { 
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {                          
                                 return $ocLazyLoad.load('admin/js/app.js');
                        }]
                    }
              
            })
            .state('admin.users' ,{
            url: '/users',
            parent:'admin',views :{
                    "display":{
                        templateUrl: 'admin/partials/users.html'           
                    }
                    
                }         
              
            })
            .state('admin.functions' ,{
            url: '/functionalities',
            parent:'admin',
            views :{
                    "display":{
                        templateUrl: 'admin/partials/functions.html'           
                    }
                }
            
              
            })
            /*.state('app.dashboard.dReadings' ,{
                url: '/readings',
                views :{
                    "display":{
                        template:'<div ng-repeat= "reading in device.readings"><devicedata reading = "reading" ></devicedata></div>'
                    }
                }
                
            })
            .state('app.dashboard.dGraph' ,{
                url: '/graph',                
                views:{
                    "display" :{
                        template :'this is graph view'
                    }
                }
                
                           
                
            })*/
            
    }
]);
/*Chart.types.Line.extend({
    name: "LineAlt",
    initialize: function (data) {
        if (this.options.yAxisLabel) this.options.scaleLabel = '         ' + this.options.scaleLabel;

        Chart.types.Line.prototype.initialize.apply(this, arguments);

        if (this.options.yAxisLabel) this.scale.yAxisLabel = this.options.yAxisLabel;
    },
    draw: function () {
        Chart.types.Line.prototype.draw.apply(this, arguments);

        if (this.scale.yAxisLabel) {
            var ctx = this.chart.ctx;
            ctx.save();
            // text alignment and color
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = this.options.scaleFontColor;
            // position
            var x = this.scale.xScalePaddingLeft * 0.3;
            var y = this.chart.height / 2;
            // change origin
            ctx.translate(x, y)
            // rotate text
            ctx.rotate(-90 * Math.PI / 180);
            ctx.fillText(this.scale.yAxisLabel, 0, 0);
            ctx.restore();
        }
    }
})

angular.module('chart.js')
    .directive('chartLineAlt', ['ChartJsFactory', function (ChartJsFactory) {
        return new ChartJsFactory('LineAlt');
    }])
*/

var sfarm =angular.module('sfarm');
sfarm
.directive('devicedata',function(){
	return{
		restrict:'E',
    
		scope:{
			reading : '='
		},
		templateUrl : 'partials/reading.php',		
	}

}) //eof devicedata



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
			

.directive('friendlyName',function($uibModal){
	return{
		restrict:'A',		
		scope:{device : '='}	,		
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
		
			$uibModal.open({
		      animation: true,
		      templateUrl: 'partials/EditFriendlyModal.php',
		      controller: 'FriendlyNameEditorCtrl',
		      resolve:{
		      	selectedDevice : function(){
		      		
		      		var data =scope.$parent.device;
		      		return data
		      	}
		      }
	        });
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata

.directive('googleGraph', [function ($scope,$window,$timeout) {

	return {
		restrict: 'EA',		
		templateUrl:'partials/googlegraph.html',
        controller : 'testCtrl'
	}
		
 		
}])


.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {	
	
	    $scope.trigger =function(){
  	 	//triggering resize fro proper graph display
  			 $rootScope.$emit('resizeMsg');  	 
  }})



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
	
.directive('logBtn',function(){
	return{
		restrict:'A',		
		
		link : function(scope,ele,attr){

			ele.bind("click",function(event){		
			 
			})
		}
	}

}) 
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

.directive('flexibleDiv', function () {
        return {
            scope: {
                opts: '=' 
            },
            link: function (scope, element, attr) {

                // Watching height of parent div
                scope.$watch(function () {
                    return element.parent(0).height();
                }, updateHeight);

                // Watching width of parent div
                scope.$watch(function () {
                    return element.parent(0).width();
                }, updateWidth);

                function updateHeight() {
                    scope.opts.chart.height = element.parent(0).height()-150; //150 custom padding
                }

                function updateWidth() {
                    scope.opts.chart.width = element.parent(0).width()-50; //50 custom padding
                }
            }
        }
    })
.directive('uibTooltip', function(){
    return {
        restrict: 'EA',        
        link:function(){
            
        }
    }
})
.directive('resize', function ($window) {
    return function (scope, elm, attr) {

        var w = angular.element($window);
           if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')
                }else
                {
                    elm.removeClass('collapse')
                }

        w.bind('resize', function () {
            
          if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')

                }else
                {
                    elm.removeClass('collapse')
                }
            //scope.$apply();
        });
    }
})
.controller('uib-accordion',
	['$scope',
	'device',
	'Notification',
	'Poller',
	'$rootScope',
	'$timeout',
	'$state',
	'$interval',
	'$filter',
	'mygraphFactory',
	'$sce',
	function($scope,device,Notification,Poller,$rootScope,$timeout,$state,$interval,$filter,mygraphFactory,$sce){


	//$scope.flag = true;
	//$scope.newdata = null;
	//$scope.graph = [];
	$scope.isLoading =true;
	$scope.graphLoading = true;
	// pulling data from server for devices
	$scope.data = device.all().then
		(function(data){
			// pushing data into scope
			$scope.data=data;		
			// initializing graph data		  	
			mygraphFactory.googleGraph($scope,$filter)			
			$scope.isLoading =false;
			return
		});

//Polling for new data
	function Repeater ()  {	 
		 Poller.poll('http://www.smartafarm.com.au/api/fetch/getupdate?t='+ new Date().toISOString())
		 .then(function(data){
		 	var index = 0;
		 	//for each new reading from server
	 		$scope.data.forEach(function(entry) {
	 		data.readings.forEach(function(reading){
	 			if(reading.did == entry._id){
	 				//pushing into device data
	 				$scope.data[index].readings.push(reading);	 				
	 				// updating last read	 				
					$scope.data[index].lread =reading;
	 				// refreshing angular js graph
	 				
	 				Notification.info({ title:'New Reading', message: $scope.data[index].name , delay:4000 }) ;
	 			}
	 		})
	 		index = index+1;
		});
		 });
	};

	// initiate Poller for data from server - comment to deactivate and vice versa
	//$rootScope.timer = $interval(Repeater, 11000);
	$scope.$on('timerEvent:stopped', function() {
		// cancel event of timer when page is redirected 
		$interval.cancel($rootScope.timer);
	});

// date filter for log readings	
   $scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   	
   	    return MyDate;
   	}

  };

  //graph on ready event
  $scope.graphready = function(test){
				$scope.graphLoading = false;				
                };

}])

.controller('AppCtrl',['$scope',
	'$state',
	'USER_ROLES',
	'$rootScope',
  function ($scope,$state,USER_ROLES,$rootScope) {  

  $scope.userRoles = USER_ROLES;
  $state.go('app.dashboard');  
  $scope.showModal = false;
}])




.controller('DashboardCtrl',[
	'$rootScope',
	'$scope',
	'$state',
	'$interval',
	'sessionService',
	'$http',
	function($rootScope,$scope,$state,$interval,sessionService,$http){

}])
.controller('deviceStatusCtrl',[
	'$scope',
	'UpdateService',
	'notify',
	'$interval',
function ($scope,UpdateService,notify,$interval) {  
	
$scope.statusToggle = function(){
	
	if($scope.device.Status == 1){
		
		var data ={"_id" : $scope.device._id ,"status" : 0};
		UpdateService.deviceStatus('update/deviceStatus',data).then(function(){
			$scope.device.Status = 0;
			$interval( notify({ message:'Device #'+ $scope.device._id+' De-Activated' , classes:'alert-danger' , duration:'10000',position:'right' } ), 1000); 
		})
	}else
	{
		var data ={"_id" : $scope.device._id ,"status" : 1};
		UpdateService.deviceStatus('update/deviceStatus',data).then(function(){
			$scope.device.Status = 1;
			$interval( notify({ message:'Device #'+ $scope.device._id+' Activated' , classes:'color:green', duration:'10000',position:'right' } ), 1000); 
		})
	}
}

}])


.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'UpdateService',
	'notify',
	'$interval',
function ($scope,$uibModalInstance,selectedDevice,UpdateService,notify,$interval) {  
	
	$scope.selectedDevice = selectedDevice;

  	$scope.ok = function() {    
  	var data ={"_id" : $scope.selectedDevice._id ,"newname" : $scope.editFname.fname.$modelValue};	  
  	  
  	  UpdateService.deviceStatus('update/fname',data).then(function(response){
  	  		$scope.selectedDevice.name = $scope.editFname.fname.$modelValue;
			$uibModalInstance.close();
			$interval( notify({ message:'Device Name updated for #' + $scope.selectedDevice._id , duration:'10000',position:'right' } ), 1000); 
		},function(response){
			alert('Update failed');
		})
	
	};

	$scope.cancel = function() {
	  $uibModalInstance.dismiss('cancel');
	};	
  

}])

.controller('LoginCtrl',[
  '$scope', 
  '$rootScope', 
  'Notification',
  '$state',
  'LoginService',
  'sessionService',
 function ($scope, $rootScope,Notification,$state,LoginService,sessionService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  
  $scope.login = function(credentials){
  	LoginService.login(credentials).then(function(response){
    if(!response){
    Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );

    }
    //$rootScope.details = response.data.details;
  
    $state.go('app');
  	},function(response){
      console.log(response)   ;
  		
  	});
  	
  }
}])

.controller('NavCtrl', ['$rootScope',
	'$scope',
	'$state',
	'$interval',
	'sessionService',
	'$http',
	function($rootScope,$scope,$state,$interval,sessionService,$http){

	$scope.logout = function(){		
		var key =sessionStorage.getItem('user') 
		sessionService.destroy(key)
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common['Bearer'] = undefined;
		$state.go('login',{}, {reload:true});
	}
	var username = sessionStorage.getItem('user');
	if (username) $scope.userName = username
	
	
	
}])
.controller('rawDataCtrl' ,['$scope','userFactory','$state','$rootScope',function ($scope,userFactory,$state,$rootScope) {
	

$scope.refresh= function(){	
	userFactory.receive('fetch/getrawdata').then(function(response){
  			var data = response;        
  			$scope.rawdata = data;  		
  		},function(response){				
				console.log(response);
		});
}
$scope.refresh();
}])
.controller('TimeCtrl', ['$scope','$timeout', function ($scope,$timeout) {
 	$scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
}])
.run(['$rootScope',
	'$state',
	'LoginService',
	'sessionService',
	'$http',
	'$interval',
function($rootScope,$state,LoginService,sessionService,$http,$interval){	
	
	 

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {
			
			var cancelEvents =function(){
		 	 $interval.cancel($rootScope.timer);
		 }
		 cancelEvents();
	    /*	    
		Validation
		*/
	    if(toState.name !== 'login'){	    
	    	var token = sessionStorage.getItem('reqTok');		    	
	    	var bearer = sessionStorage.getItem('user');		    	
	    	if (token && bearer){
	    		$http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
	    		$http.defaults.headers.get = { 'Content-Type': 'application/json' }
	    		$http.defaults.headers.common['X-Auth-Token'] = token   ;
	    		$http.defaults.headers.common['Bearer'] = bearer			    			    ;
	    	}
	    	else 
	    	{	
	    		event.preventDefault();
	    		sessionService.destroy('user');
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined
	    		$http.defaults.headers.common['Bearer'] = undefined   			    			    
	    		$state.go('login')
	    	};
	    }
	})


}])

.factory('device',['$http','$q','reqInspect',function($http,$q,reqInspect){
return{
		all:function(credentials){
            var deferred = $q.defer();
            $http({
                url:'http://www.smartafarm.com.au/api/fetch/getdevices',
               // url:'http://www.smartafarm.com.au/api/fetch/getdevices',
                method:'GET'
            }).then(function(response){
                deferred.resolve(response.data)
            },function(reject){
                deferred.reject(reject);
            });
            return deferred.promise
        }
		      
   }	
}])// eof getdevices
.factory('Poller', function($http,$q,reqInspect){
               return {
                    poll : function(api){
                        var deferred = $q.defer();
                        $http.get(api).then(function (response) {                            
                            deferred.resolve(response.data);
                        },function(response){
                           return deferred.reject() ;//reqInspect.submitResposne(response.status) ;                           
                        });
                        return deferred.promise;
                       
                    }

                }
            })




.factory('mygraphFactory', function()
{

 return{
  
    googleGraph:function($scope,$filter){
  
            
            // Creating Graph Data container
             $scope.graphLevel = {};
               var myIndex = -1;
               var level = {};
              angular.forEach($scope.data, function(deviceReadings, key){
                myIndex = myIndex + 1;
                // initializing data
                $scope.graphLevel[myIndex] = {};
                $scope.graphLevel[myIndex]['data'] = {};
                //setting coloums
              
              $scope.graphLevel[myIndex].data = {"cols": [
                  {id: "t", label: "Time", type: "date"},
                  {id: "t01", label: "T01", type: "number"},
                  {id: "l01", label: "L01", type: "number"},
                  
              ]}

                //initializing rows
                

                $scope.graphLevel[myIndex].data['rows'] = {};

                //temp rows for creating data array for graph
                
                var c = [];                
                level["rows"] = [];
                
                var index = -1;
                angular.forEach(deviceReadings.readings, function(readingData, keya){ 
                  index =index +1 ; 
                  var dt =   new Date(readingData.dt); 
                 
                  dt1 = dt.getDate()  + "/" + dt.getMonth()  + "/" + dt.getFullYear()  + dt.getHours() + ':' +dt.getMinutes();
                  
                    //level
                    level.rows[index]=[];
                    level.rows[index]['c'] = []
                    level.rows[index].c.push({'v' : dt }); 
                    angular.forEach(readingData.data, function(data, keyb){
                     var sensor= readingData.data.sensorID;                   
                      var annote = dt.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")                
                      angular.forEach(data.sdata, function(sdata, keyc){ 
                        level.rows[index].c.push({'v' : parseFloat(sdata.value)/10});
                      });// eof sdata

                    });//eof data

                })//eof reading data;

              //push temp array to graph array                
              $scope.graphLevel[myIndex].data['rows'] =level['rows'];
              //defining chart type              
              $scope.graphLevel[myIndex].type = 'AnnotationChart';              
              
              //setting chart options
              var dt = new Date();
             // console.log(dt);
              var dt1 = new Date(dt.getFullYear()  ,dt.getMonth() ,dt.getDate() )
              //console.log(dt1);
              $scope.graphLevel[myIndex].options = {
                'title': 'Level',                
                 "fill": 20,       
                "animation" : {
                        'startup' : true,
                        'duration': 400,
                       'easing': 'inAndOut',                      
                  },
                  "chartArea" :{
                    'backgroundColor' :
                    {'stroke': 'blue'}
                    
                  },
                  'colors': ['blue','green'],
                   'pointSize': 10,
                  'zoomStartTime' : dt1,     
                  'zoomEndTime' : dt  ,           
                  'displayAnnotations' : false,
                  'displayAnnotationsFilter' :false,                  
                  'displayLegendDots' :false,
                  'scaleColumns' : [1,2],
                  //'allValuesSuffix' : '%',
                  'scaleType' : 'allmaximized',
                  'table':{
                    'sortAscending' :false
                  },                  
                  min : 0,                 
                  displayLegends :false,
                  legendPosition:'newRow',
                  //scaleFormat : '#\'%\'',
                  dateFormat:'hh:mm a dd-MM-yy'                  
              };
              console.log($scope.graphLevel[myIndex]);
               
          })}}})  

// angular JS chart library function version 1.

/*    angularChart.js:function($scope,$filter){
            // creating graph value array
             $scope.labels =[];
              $scope.series = [['Temprature'],['Level']];  
              var myIndex = -1;
              angular.forEach($scope.data, function(deviceReadings, key){      
                myIndex = myIndex + 1;
                $scope.graph[myIndex] = [];
                var temp = {};
                var level = {};
                var axisLabels = []; 
                var series = [];
                series[0] = [];
                series[1] = []; 
                angular.forEach(deviceReadings.readings, function(readingData, keya){    
                  axisLabels.push($filter('date')(readingData.dt, 'h:mm a'));
                    angular.forEach(readingData.data, function(data, keyb){
                      angular.forEach(data.sdata, function(sdata, keyc){
                      if(sdata.type === 'Temp')
                        {
                          if(!temp[sdata.id]){
                            temp[sdata.id] = []; 
                            series[0].push(sdata.id);
                          }
                          temp[sdata.id].push(parseFloat(sdata.value));
                        }else if(sdata.type === 'Level')
                        {
                          if(!level[sdata.id]){               
                            level[sdata.id] = []; 
                            series[1].push(sdata.id)           
                          }
                          level[sdata.id].push(parseFloat(sdata.value));
                        }
                      });// eof sdata
                    });//eof data
                })//eof reading data;
               $scope.graph[myIndex]['temp'] = [];
               $scope.graph[myIndex]['level'] = [];
               $scope.graph[myIndex]['series'] = series;
               $scope.graph[myIndex]['labels'] = axisLabels;
               angular.forEach(temp,function(value,key){     
                $scope.graph[myIndex]['temp'].push(value);     
               });
              angular.forEach(level,function(value,key){     
                $scope.graph[myIndex]['level'].push(value);     
               });     
              });


              // chart options temprature
              $scope.chart_options_temp = {
                  multiTooltipTemplate: function(label) {
                  return label.datasetLabel + ': ' + label.value;
                  },
                  tooltipTemplate: function(label) {
                  return label.datasetLabel + ' : ' + label.value +' ℃ ';
                  },
                  scaleBeginAtZero: false,
                  yAxisLabel: "My Y Axis Label"
                  //scale options for chart
                  /*scaleBeginAtZero: false,
                  scaleOverride: true,
                  scaleSteps: Math.ceil((max-start)/step),
                  scaleStepWidth: step,
                  scaleStartValue: start
              }; 
              $scope.chart_options_level = {
                  multiTooltipTemplate: function(label) {
                  return label.datasetLabel + ': ' + label.value;
                  },
                  tooltipTemplate: function(label) {
                  return label.datasetLabel + ' : ' + label.value +' % ';
                  },
                  scaleBeginAtZero: false,
                  yAxisLabel: "My Y Axis Label"

                  //scale options for chart
                  /*scaleBeginAtZero: false,
                  scaleOverride: true,
                  scaleSteps: Math.ceil((max-start)/step),
                  scaleStepWidth: step,
                  scaleStartValue: start
              }; 
              // clicking dot points event
              $scope.onClick = function (points, evt) {
                  console.log(points, evt);
                };
              $scope.testShow1= false;
              //setting graph colours
              $scope.colours= [{ 
                // default
                fillColor: 'rgba(3, 108, 48, 0.2)',
                pointColor: 'green',
                strokeColor: 'rgba(47, 132, 71, 0.8)',
                highlightFill: 'rgba(47, 132, 71, 0.8)',
                highlightStroke: 'rgba(47, 132, 71, 0.8)'
                /* "fillColor": "rgba(3, 108, 48, 0.2)",
                "strokeColor": "rgba(207,100,103,1)",
                "pointColor": "rgba(220,220,220,1)",
                "pointStrokeColor": "#fff",
                "pointHighlightFill": "#fff",
                "pointHighlightStroke": "rgba(151,187,205,0.8)"
              }]

    },
    setValue:function($scope,$filter,myIndex){
            // creating graph value array
             $scope.labels =[];
              $scope.series = [['Temprature'],['Level']];  
              
              angular.forEach($scope.data[myIndex], function(deviceReadings, key){                  
                
                $scope.graph[myIndex] = [];
                var temp = {};
                var level = {};
                var axisLabels = []; 
                var series = [];
                series[0] = [];
                series[1] = []; 
                angular.forEach($scope.data[myIndex].readings, function(readingData, keya){   
                  
                  axisLabels.push($filter('date')(readingData.dt, 'h:mm a'));
                    angular.forEach(readingData.data, function(data, keyb){
                      angular.forEach(data.sdata, function(sdata, keyc){
                      if(sdata.type === 'Temp')
                        {
                          if(!temp[sdata.id]){
                            temp[sdata.id] = []; 
                            series[0].push(sdata.id);
                          }
                          temp[sdata.id].push(parseFloat(sdata.value));
                        }else if(sdata.type === 'Level')
                        {
                          if(!level[sdata.id]){               
                            level[sdata.id] = []; 
                            series[1].push(sdata.id)           
                          }
                          level[sdata.id].push(parseFloat(sdata.value));
                        }
                      });// eof sdata
                    });//eof data
                })//eof reading data;
               $scope.graph[myIndex]['temp'] = [];
               $scope.graph[myIndex]['level'] = [];
               $scope.graph[myIndex]['series'] = series;
               $scope.graph[myIndex]['labels'] = axisLabels;
               angular.forEach(temp,function(value,key){     
                $scope.graph[myIndex]['temp'].push(value);     
               });
              angular.forEach(level,function(value,key){     
                $scope.graph[myIndex]['level'].push(value);     
               });     
              });

    },*/
  

  
 
.factory('LoginService', ['$http','$q', function($http,$q){
	return {
		login : function(credentials){
			var deferred = $q.defer();
			$http({
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/login/authenticate',
				//	url:'http://localhost/api/login/authenticate',
				method:'POST',
				data: {credentials:credentials}
			}).then(function(response){
				
				if(response){
								sessionStorage.setItem('user',response.data.id) ;
								sessionStorage.setItem('reqTok',response.data.token) ;

							}
			
				deferred.resolve(response)
			},function(reject){
				
				deferred.reject(reject);
			});
		 	return deferred.promise
		},
		isAuth : function(token,id){
			var deferred = $q.defer();
			$http({
				url:'http://www.smartafarm.com.au/api/login/validate',
				method:'POST',
				data: {data:{'user' : id , 'token' : token}}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		destroy : function(key){
			var deferred = $q.defer();
			$http({
				url:'http://www.smartafarm.com.au/api/login/destroy',
				method:'POST',
				data: {'user' : key }
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			}					
		}
}])

.factory('reqInspect',['$injector',
	function($injector){
	return{	
	
	 responseError: function(rejection) {
        if (rejection.status === 401) {         
         var sessionService = $injector.get('sessionService');
         var $http = $injector.get('$http');
         var $state = $injector.get('$state');
				sessionService.destroy();
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined;
	    		$http.defaults.headers.common['Bearer'] = undefined;   			    			    
	    		$state.go('login')    ;    	
          };
        }
    }
	

}])

.factory('sessionService', ['LoginService','$interval','$rootScope', function(LoginService,$interval,$rootScope){
	return {
			set:function(key,value){
				return sessionStorage.setItem(key,value);
			},
			get:function(key){
				return sessionStorage.getItem(key);
			},
			destroy:function(){
				//cancelling the update timer
				$rootScope.$broadcast('timerEvent:stopped');
			//	$interval.cancel($scope.timer);
				var key = sessionStorage.getItem('user');
				LoginService.destroy(key);
				sessionStorage.removeItem('user');						
				sessionStorage.removeItem('reqTok');
				return;
			}
		}
	
}])
.factory('UpdateService', ['$http','$q', function($http,$q){
	return {
		deviceStatus : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://www.smartafarm.com.au/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])
.factory('userFactory', ['$http','$q', function($http,$q){
	return {
		receive : function(api){
			var deferred = $q.defer();			
			$http({
				//url:'http://www.smartafarm.com.au/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'GET'				
			}).then(function(response){
				deferred.resolve(response.data);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			},
		submit : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://www.smartafarm.com.au/api/'+api,
				url:'http://www.smartafarm.com.au/api/'+api,
				method:'POST',
				data: {serverData:serverData}
			}).then(function(response){
				deferred.resolve(response);
			},function(response){				
				deferred.reject("Failed");
			});
		 	return deferred.promise;
			}
		}
}])