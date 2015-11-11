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
                controller: "AppCtrl",
                data: {
                          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                        }  
            })
            .state('app.dashboard' ,{
                url: 'app/dashboard',
                templateUrl: 'templates/dashboard.html' ,
                controller :'DashboardCtrl',
                parent:'app',                                         
                data: {
                          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                    }  	
                
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