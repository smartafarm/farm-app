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
                     // debugger;
                      var dt =   new Date(readingData.dt); 
                      index[sensor] = index[sensor] + 1 ;
                      level[sensor].rows[index[sensor]]=[];
                      level[sensor].rows[index[sensor]]['c'] = []
                            //pushing reading date
                            
                      level[sensor].rows[index[sensor]].c.push({'v' : dt }); 
                      var annote = dt.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")                
                    
                      angular.forEach(data.sdata, function(sdata, keyc){ 
                        //pushing reading data
                        level[sensor].rows[index[sensor]].c.push({'v' : parseFloat(sdata.value)/10});
                    
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
