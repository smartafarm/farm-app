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
'ui.grid.exporter'

])
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
.config(['$animateProvider', function($animateProvider) {
      //configuartion to animate accordion for UIB ANGULAR BOOTSTRAP
      $animateProvider.classNameFilter(/^((?!(ui-grid-menu)).)*$/);
  }
])

//APPLICATION ROUTING SCRIPT

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
            .state('forgot', {                
                url: '/forgot',   
                templateUrl: 'templates/forgot.html'                  
            })
            .state('app.dashboard' ,{
                url: 'app/dashboard',
                templateUrl: 'templates/dashboard.html' ,
                controller:'dashboardMasterCtrl'  ,               
                parent:'app'
            })
            .state('app.reports' ,{
                url: 'app/reports',
                templateUrl: 'templates/reports.html' ,
                controller:'reportsCtrl'  ,               
                parent:'app'
            })
              .state('app.rawdata' ,{
                url: 'app/rawdata',
                templateUrl: 'templates/rawdata.html' ,
                controller :'rawDataCtrl',
                parent:'app'
            })

              // admin routes
           .state('admin' ,{
            url: '/admin',
            templateUrl: 'admin/test.html',
            controller:'adminCtrl',
            resolve: { 
                        //LAZY loading admin scripts 
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
            .state('admin.organisation' ,{
            url: '/organisation',
            parent:'admin',
            views :{
                    "display":{
                        templateUrl: 'admin/partials/organisation.html'           
                    }
                }
            
              
            })
            .state('admin.device' ,{
            url: '/device',
            parent:'admin',
            views :{
                    "display":{
                        templateUrl: 'admin/partials/device.html'           
                    }
                }
            
              
            })
            .state('oadmin' ,{
            url: '/manage',
            templateUrl: 'oadmin/index.html',
            controller:'oadminCtrl',
            resolve: { 
                        //LAZY loading organization admin scripts 
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {                          
                                 return $ocLazyLoad.load('oadmin/js/app.js');
                        }]
                    }
              
            })
            .state('oadmin.users' ,{
            url: '/users',
            parent:'oadmin',views :{
                    "display":{
                        templateUrl: 'oadmin/partials/users.html'           
                    }
                    
                }         
              
            })

    }
]);

var sfarm =angular.module('sfarm');
sfarm
.directive('devicedata',function(){
	//directive to print data from devices into accordion
	return{
		restrict:'E',
    
		scope:{
			reading : '='
		},
		templateUrl : 'partials/reading.php',		
	}

}) //eof devicedata



.directive('devicePanel', [function () {
	return {
		restrict: 'E',
		templateUrl:'partials/devicePanel.html',
		
		link:function(scope,elm,attr){
			
		}
	};
}])
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
			

.directive('friendlyName',function($uibModal){
	//directive to edit friendly name of the device
	//triggers a modal
	return{
		restrict:'A',					
		link : function(scope,ele,attr){
			
			ele.bind("click",function(event){
			//open modal
			$uibModal.open({
		      animation: true,
		      templateUrl: 'partials/EditFriendlyModal.php',
		      controller: 'FriendlyNameEditorCtrl',
		      resolve:{
		      	//send data of selected device to controller
		      	selectedDevice : function(){
		      		
		      		var data =scope.$parent.device;
		      		return data
		      	},
		      	graphdata : function(){
		      		
		      		var data =scope.$parent.graph;
		      		return data
		      	},
		      }
	        });
	        //prevent default click event
			 event.preventDefault();
			 event.stopPropagation();      			
			})
		}
	}

}) //eof devicedata

.directive('googleGraph', [function ($scope) {
//directive to print google annotation graph
	return {
		restrict: 'EA',		
		templateUrl:'partials/googlegraph.html',
        controller : 'testCtrl',
        link:function(scope,attr,elm,testCtrl){
        	if(scope.device.readings){
                        
        		scope.getGraph();
        	}else{
        		
        	}
        }
	}
		
 		
}])
/*
* Controller in directive currently for testing
 */

.controller('testCtrl',  function ($scope,mygraphFactory,$filter,$rootScope,$rootScope) {	
})



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
	
.directive('noClick',function(){
	//directive to prevent default click to open panel header
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

.directive('saveSensor', ['Notification',function (Notification) {
	return {
		restrict: 'A',
		
		link: function (scope, ele, iAttrs) {
			ele.bind('click',function(){	
				scope.checkSensor (scope.$index);
			
				/**/
			})
		}
	};
}])
.directive('resize', function ($window) {
    //directive to collapse panel header on window resize
    //receives horizontal value from html element to trigger collapse
    return function (scope, elm, attr) {

        var w = angular.element($window);
        //when elements are initialized
           if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')
                }else
                {
                    elm.removeClass('collapse')
                }

        w.bind('resize', function () {
            
        //resize done on the fly            
          if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')

                }else
                {
                    elm.removeClass('collapse')
                }
            
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
  // Main application controller	
		
  $scope.userRoles = USER_ROLES;
  //default route to dashboard
 // $state.go('app.dashboard'); 

  
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

.controller('forgotCtrl',[
  '$scope', 
  '$rootScope', 
  'Notification',
  '$state',
  'LoginService',
  
 function ($scope, $rootScope,Notification,$state,LoginService) { 
  
  
  
  $scope.submit = function(credentials){
    
    //Checking credintials
    $scope.loading = true;
  	LoginService.getd('login/forgot/exists',$scope.frgot.uname).then(function(response){
    	if(response.status == 200){
    		if(response.data ==1){
    			Notification.success({message:'Reset Link Sent'});
    			$scope.success = true;
    			$scope.error = false;
    		}else{
    			$scope.error = "Usename does not exist";
    		}
    	}
    	$scope.loading = false;
	  	},function(response){
	  	});
  	
  	}
}])

.controller('FriendlyNameEditorCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'userFactory',
	'Notification',
	'$interval',
	'graphdata',
function ($scope,$uibModalInstance,selectedDevice,userFactory,Notification,$interval,graphdata) { 

	
	
	$scope.sensorUpdate =[];	
	$scope.selectedDevice = selectedDevice;

  	$scope.saveDeviceName = function() {    
  	//Updating Fname
  
  	var data ={"_id" : $scope.selectedDevice._id ,"fname" : $scope.newfname};	
  		userFactory.submit('update/fname',data).then(function(response){
  	  		if(response.status ==200){
  	  			$scope.selectedDevice.name = $scope.newfname;  	
	  	  		Notification.success({ message:'Device Name Updated' , delay:4000 })	  	  		
	  	  	}
		})   
  				
  
  	
 	}
 	$scope.saveSensor = function(asset){
 	
 		var data={"_id" : $scope.selectedDevice._id ,"asset" : asset.assetInfo.id ,"fname" : asset.fnameUpdate}	
 		userFactory.submit('update/sname',data).then(function(response){

			if(response.status == 200){
	  	  		angular.forEach(selectedDevice.asset,function(value,key){
		 			if(value.id === asset.assetInfo.id){
		 				value.fname = asset.fnameUpdate;
		 				graphdata[asset.assetInfo.assigned].info.fname = asset.fnameUpdate;
		 			}
	
				})	
				Notification.success({ message:'Sensor Name Updated' , delay:4000 })
			}

		}) 
 		

 	}
	$scope.cancel = function() {
		//closing modal on cancel click
		
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
  
  //main login page controller. 
  
  $scope.login = function(credentials){
    
    //Checking credintials
  	LoginService.login(credentials).then(function(response){

    if(!response){
    //if no response recevied
    Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );
    }
    
    //routing to main application on successful login
    $state.go('app.dashboard');
  	},function(response){
         //console.log(response)   ;
  		
  	});
  	
  }
}])

.controller('dashboardMasterCtrl', [
	'$scope',
	'device',
	'$rootScope',
	'mygraphFactory',
	'$filter',
	'$window',
 function ($scope,device,$rootScope,mygraphFactory,$filter,$window) {
 	
 	$scope.listData = [];
	$scope.isLoading = true;	
	$scope.graphLoading = true;
	$scope.changeCall  = true;
	device.all().then(function(data){
		$scope.data = data;
		$scope.isLoading = false;
		$scope.device = $scope.data[0]
		
		
	})
  $scope.graphready = function(test){
  				
				$scope.graphLoading = false;	
				
				if($scope.changeCall){
					//if device is changed resize is called to adjust graph correctly
					$scope.trigger();
					$scope.changeCall = false;
				}
                };
$scope.getGraph = function(){	
	//variable to trigger the graph resize message
	$scope.changeCall = true
	
	if($scope.device.readings.length > 0) 
		{
			mygraphFactory.getGraph($scope).then(function(){		
			})
			
		}

}
	    $scope.trigger =function(){
  	 	//triggering resize for proper graph display when accordion header is clicked
  			 $rootScope.$emit('resizeMsg');  	 
  }
$scope.getdate = function (MyDate) {
   	if(MyDate){
   		MyDate =  MyDate.getFullYear() +'-'+
   			('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
   			('0' + MyDate.getDate()).slice(-2)
   	
   	    return MyDate;
   	}

  };
	
	$rootScope.getuser.then(function(response){
		$rootScope.user = response;				
	})

	
}])
.controller('NavCtrl', ['$rootScope',
	'$scope',
	'$state',
	'$interval',
	'sessionService',
	'$http',
	function($rootScope,$scope,$state,$interval,sessionService,$http){
//Navigation bar controller		

	$scope.logout = function(){		
		//retreiving user to logout
		var key =sessionStorage.getItem('user') 
		sessionService.destroy(key)
		//destroying headers
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common['Bearer'] = undefined;
		//routing to login page
		$state.go('login',{}, {reload:true});
	}
	//retreiving username to display on Navbar
	var username = sessionStorage.getItem('user');
	if (username) $scope.userName = username
	$scope.footdt = new Date();
	
	
}])
.controller('rawDataCtrl' ,['$scope','userFactory','$state','$rootScope',function ($scope,userFactory,$state,$rootScope) {
	
//Temporary controller for raw data from device

$scope.refresh= function(){	
	//pull data on button click
	userFactory.receive('fetch/getrawdata').then(function(response){
  			var data = response;        
  			$scope.rawdata = data;  		
  		},function(response){				
				console.log(response);
		});
}
//called to receive data when controller initiated
$scope.refresh();
}])
.controller('reportsCtrl', [
	'$scope',
	'$rootScope',
	'userFactory',
  '$filter',
	
 function ($scope,$rootScope,userFactory,$filter) {
//getting global user properties
$scope.myData = [];
$scope.selAsset =[];
$rootScope.getuser.then(function(response){
	$rootScope.user = response;		
	//Receiving User Devices
	$scope.devices = [];
	var index = 0;
	angular.forEach(response.device,function(value,key){		
		userFactory.receive('fetch/readings/deviceInfo?did='+ key).then(function(response1){
		//setting default selection
		if(index == 0) {
      $scope.sensors = [];
      $scope.device = response1[0];
      angular.forEach($scope.device.asset , function(asset,key){
        angular.forEach(asset.sensor,function(sensor,key1){
          $scope.sensors.push(sensor);
        })
      })
      //fetching data
      $scope.refreshData();

    }
		$scope.devices.push(response1[0]);
		index = index + 1;
		})
	})	
})	





$scope.checkAll = function(){  
  angular.copy($scope.sensors,$scope.selAsset);
}


$scope.uncheckAll = function(){  
  angular.copy([],$scope.selAsset);
}


$scope.refreshData = function(){
  //receivng data
  $scope.loading = true;
  userFactory.receive('fetch/readings/device?did='+$scope.device._id).then(function(response){
  $scope.data =response;  
  //filling data table
  $scope.generateReport();     
  })  
  $scope.sensors = [];
  //creating checklist model
  angular.forEach($scope.device.asset , function(asset,key){
        angular.forEach(asset.sensor,function(sensor,key1){
          $scope.sensors.push(sensor);
        })
      })
  //checking all sensors by default
  $scope.checkAll();  
}


 //setting grid view
  $scope.gridOptions = {      
   data: 'myData',
   enableGridMenu: true,
   enableRowSelection: true,        
   selectionRowHeaderWidth: 35,
   rowHeight: 35,
   rowWidth : 20,
   exporterMenuPdf: false,
   enableColumnResizing : true,
   paginationPageSizes: [50,100,150,200],
   paginationPageSize: 50,
   columnDefs:[
   { field: 'did' ,displayName:'Device' }  ,
   { field: 'date',displayName:'Date',width:140,cellFilter: 'date' } ,
   { field: 'time',displayName:'Time',width:140 }  ,
   { field: 'sensor' ,displayName:'Sensor ID'},
   { field: 'type' ,displayName:'Read Type'},
   { field: 'value' ,displayName:'Read value'}
   ]   
 }
 
 

$scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope      
      
      $scope.gridApi = gridApi;
      gridApi.selection.setMultiSelect(false);

    }

$scope.generateReport = function(){
  //refresing data
  $scope.myData = [];
  
  angular.forEach($scope.data ,function(readings,key){
    angular.forEach(readings.data,function(rdata,key1){
      angular.forEach(rdata.sdata,function(sdata,key2){
        if($scope.selAsset.indexOf(rdata.sensorID) != -1)
        //query filter
        { 
          var dt = new Date(readings.dt.replace(/-/g, "/")); 
          $scope.myData.push(
            {
              "did" : readings.did, //device id
              "date" :$filter('date')(dt,'dd-MM-yyyy'), //date
              "time" :$filter('date')(dt,'shortTime'), //time
              "sensor" : rdata.sensorID , //sensor id
              "type" :sdata.id, // temp or level
              "value":sdata.value  //reading                      
            })//eof mydata push
        }
     })//eof sdata
    })  //eof rdata
  }) // eof readings
$scope.loading = false; 
}


	
}])
.controller('TimeCtrl', ['$scope','$timeout', function ($scope,$timeout) {

	//Login page timer controller
 	$scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms
    //Clocl settings
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
	'userFactory',
function($rootScope,$state,LoginService,sessionService,$http,$interval,userFactory){	
	
	 // Default run of application

	$rootScope.$on('$stateChangeStart', 
		//cancel the timer pulling information from server when page is routed from dashboard
		function(event, toState, toParams, fromState, fromParams) {			
			var cancelEvents =function(){
		 	 $interval.cancel($rootScope.timer);
		 }
		 cancelEvents();
	    /*	    
		Add Authorization token on each request
		*/
	    if(toState.name !== 'login' && toState.name !== 'forgot' ){	   
	    	
	    	var token = sessionStorage.getItem('reqTok');		    	
	    	var bearer = sessionStorage.getItem('user');

	    	if (token && bearer){
	    		$http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
	    		$http.defaults.headers.get = { 'Content-Type': 'application/json' }
	    		$http.defaults.headers.common['X-Auth-Token'] = token   ;
	    		$http.defaults.headers.common['Bearer'] = bearer			    			    ;
	    		
		    	if(!$rootScope.user){
	                                                     
	                $rootScope.getuser = userFactory.receive('fetch/getuserinfo/'+bearer).then
	                (function(response){
	                   if(response){
	                        return response;      
	                   }
	                  return
	               })
            	}
	    	}
	    	else 
	    	{	
	    		//if no token or bearer found
	    		event.preventDefault();	    		
	    		sessionService.destroy('user');
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined
	    		$http.defaults.headers.common['Bearer'] = undefined   			    			    

	    		$state.go('login')
	    	};
	    }else{
	    	
	    	if($rootScope.user){	    			
	    			 delete $rootScope.user ;
	    		}
	    }
	})


}])

.factory('device',['$http','$q','reqInspect',function($http,$q,reqInspect){
    //Factory to recevie user device data and readings based on user
return{

		all:function(credentials){
            var deferred = $q.defer();
            $http({
               // url:'http://www.smartafarm.com.au/api/fetch/getdevices',              
                url:'http://localhost/api/fetch/getdevices',   
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

//Ajax poller to fetch data
//current timer 11 seconds
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




.factory('mygraphFactory', function($q)
  //Factory to prepare graph data for each device
{

 return{
     getGraph:function($scope){   
    
       // Creating Graph Data container
        var deferred = $q.defer();
      
             $scope.graph = {};
               var myIndex = -1;
               var level = {};
               var sensor ='a' ;
               var checksensor = [];
               var hit = false;
               var info ;
                myIndex = myIndex + 1;
                // initializing data
                $scope.graph = {};
                

                //initializing rows
                
                //temp rows for creating data array for graph
                          
                var index = []

                angular.forEach($scope.device.readings, function(readingData, keya){ 
                  
                    angular.forEach(readingData.data, function(data, keyb){
                    
                     sensor = data.sensorID; 
                                       
                      if(checksensor.indexOf(sensor) == -1){   
                          index[sensor] = -1;
                          checksensor.push (sensor)     ;
                          level[sensor] = [];               ;
                          level[sensor]["rows"] = [];
                          $scope.graph[sensor] = {};
                          info = {};
                          /*$scope.graph[sensor]['gid'] = sensor*/
                          
                          $scope.device.asset.forEach(function(assetValue,key){

                            if(assetValue.sensor.indexOf(sensor) != -1){
                              info = assetValue;
                              hit = true;
                            }
                          
                          })
                        /*  $scope.device.sensor.forEach(function(sensorValue,key){
                            if(sensor == sensorValue.id){
                              info = sensorValue;
                              hit = true;
                            }
                          
                          })*/
                          
                          if(hit){
                            $scope.graph[sensor]['info'] = {'id': sensor , 'fname' : info.fname};
                            hit =false;
                          }else
                          {
                            $scope.graph[sensor]['info'] = {'id': sensor , 'fname' : 'Sensor info unavailable'};
                          }
                          
                          
                          $scope.graph[sensor]['data'] = {};
                            //setting coloums
                          
                          $scope.graph[sensor].data = {"cols": [
                              {id: "t", label: "Time", type: "date"},
                              {id: "t01", label: "T01", type: "number"},
                              {id: "l01", label: "L01", type: "number"},
                              
                          ]}
                          $scope.graph[sensor].data['rows'] = {};
                                             
                          
                           $scope.graph[sensor].type = 'AnnotationChart';              
              
                          //setting chart options
                          var startDate = new Date();
                          var dt1 = new Date(startDate.getFullYear()  ,startDate.getMonth() ,startDate.getDate() )
                          $scope.graph[sensor].options = {
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
                              'zoomEndTime' : startDate  ,           
                              'displayAnnotations' : false,
                              'displayAnnotationsFilter' :false,                  
                              'displayLegendDots' :false,
                              'scaleColumns' : [1,2],             
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
                                                     
                            
                          
                      }
                     //debugger;
                     //string replacing - with slash to provide all browser compatibility
                    
                   var dt =  new Date(readingData.dt.replace(/-/g, "/")); 
                //  var dt =  new Date(readingData.dt)
                      index[sensor] = index[sensor] + 1 ;
                      level[sensor].rows[index[sensor]]=[];
                      level[sensor].rows[index[sensor]]['c'] = []
                            //pushing reading date
                            
                      level[sensor].rows[index[sensor]].c.push({'v' : dt }); 
                      //var annote = dt.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")                
                    
                      angular.forEach(data.sdata, function(sdata, keyc){ 
                        //pushing reading data
                       // level[sensor].rows[index[sensor]].c.push({'v' : parseFloat(sdata.value)/10});
                        level[sensor].rows[index[sensor]].c.push({'v' : sdata.value});
                    
                      });// eof sdata

                    });//eof data

                })//eof reading data;
              
              //push temp array to graph[sensor] array                
              checksensor.forEach(function(value,key){
                $scope.graph[value].data['rows'] =level[value]['rows'];  
              })
             deferred.resolve();
             
         return deferred.promise;   
              //defining chart type              
             
  },
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
                    level.rows[index]=[];
                    level.rows[index]['c'] = []
                    //pushing reading date
                    
                    level.rows[index].c.push({'v' : dt }); 
                    
                    angular.forEach(readingData.data, function(data, keyb){
                     var sensor= readingData.data.sensorID;                   
                      var annote = dt.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")                
                    
                      angular.forEach(data.sdata, function(sdata, keyc){ 
                        //pushing reading data
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
              var dt1 = new Date(dt.getFullYear()  ,dt.getMonth() ,dt.getDate() )
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
              
               
          }
        )}

}})  

.factory('LoginService', ['$http','$q', function($http,$q){
	//Factory for user login
	return {
		login : function(credentials){
		//main login function to set user credentials
			var deferred = $q.defer();
			$http({
				//setting headers
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/login/authenticate',				
				//url:'http://localhost/api/login/authenticate',		
				method:'POST',
				data: {credentials:credentials}
			}).then(function(response){
				
				if(response){
								//setting sessions in browser
								sessionStorage.setItem('user',response.data.id) ;
								sessionStorage.setItem('reqTok',response.data.token) ;
								
								
							}
					deferred.resolve(response);
				
			},function(reject){
				
				deferred.reject(reject);
			});
		 	return deferred.promise
		},

		isAuth : function(token,id){
		//authorize token on each request			
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
		//destroy token and user credentials
			var deferred = $q.defer();
			$http({
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/login/destroy',
				method:'POST',
				data: {'user' : key }
			}).then(function(response){
				deferred.resolve();
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			},

		getd : function(api,key){
		//destroy token and user credentials
			var deferred = $q.defer();
			$http({
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url:'http://www.smartafarm.com.au/api/' + api,
				//url:'http://localhost/api/' + api,
				method:'POST',
				data: {'user' : key }
			}).then(function(response){
				deferred.resolve(response);
			},function(response){
				 deferred.reject("Failed");
			});
		 	return deferred.promise;
			}					
		
		}	
		
}])

.factory('reqInspect',['$injector',
	//factory to intercept each request
	function($injector){
	return{	
	//intercepting response error
	 responseError: function(rejection) {
        if (rejection.status === 401) {         
    	//if response status 401 then route to login and destroy credentials
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
	//Factory to set session
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
				//destroying the values
				var key = sessionStorage.getItem('user');
				if(key)
				{LoginService.destroy(key);}
				sessionStorage.removeItem('user');						
				sessionStorage.removeItem('reqTok');
				return;
			}
		}
	
}])
.factory('UpdateService', ['$http','$q', function($http,$q){
	//factory to update device status
	return {
		deviceStatus : function(api,serverData){
			var deferred = $q.defer();			
			$http({
				//url:'http://localhost/api/'+api,
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
	//factory to sending and receiving information
	return {
		receive : function(api){
			var deferred = $q.defer();			
			$http({
				url:'http://localhost/api/'+api,
				//url:'http://www.smartafarm.com.au/api/'+api,
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
				url:'http://localhost/api/'+api,
				//url:'http://www.smartafarm.com.au/api/'+api,
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