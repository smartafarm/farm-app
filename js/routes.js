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