.factory('mygraphFactory', function()
{

 return{
    setGraph:function($scope,$filter){
  
      
            // Creating Grapg Data container
          
             $scope.graphTemprature = {};
             $scope.graphLevel = {};
           
               var myIndex = -1;
               var temp = {};
               var level = {};
              angular.forEach($scope.data, function(deviceReadings, key){  
              
                myIndex = myIndex + 1;
                var addCol =false;
                // initializing data
                
                $scope.graphTemprature[myIndex] = {};
                $scope.graphTemprature[myIndex]['data'] = {};
                $scope.graphLevel[myIndex] = {};
                $scope.graphLevel[myIndex]['data'] = {};
                //setting coloums
               $scope.graphTemprature[myIndex].data = {"cols": [
                  {id: "t", label: "Time", type: "date"},    
                  {id: "t01", label: "T01", type: "number"},
                  {id: "t01", label: "T02", type: "number"},
                  
                  
              ]}
              $scope.graphLevel[myIndex].data = {"cols": [
                  {id: "t", label: "Time", type: "date"},
                  {id: "l01", label: "L01", type: "number"},
                  {id: "l01", label: "L02", type: "number"}
              ]}

                //initializing rows
                
                $scope.graphTemprature[myIndex].data['rows'] = {};
                $scope.graphLevel[myIndex].data['rows'] = {};

                //temp rows for creating data array for graph
                
                var c = [];
                temp["rows"] = [];
                temp1  = [];
                level["rows"] = [];
                
                var index = -1;
                angular.forEach(deviceReadings.readings, function(readingData, keya){ 
                  index =index +1 ; 
                  var dt =   new Date(readingData.dt); 
                  //temprature
                    temp.rows[index]=[];
                    temp.rows[index]['c'] = []
                   
                    temp.rows[index].c.push({'v' : dt }); 
                    //level
                    level.rows[index]=[];
                    level.rows[index]['c'] = []
                    level.rows[index].c.push({'v' : dt }); 

                    angular.forEach(readingData.data, function(data, keyb){
                     
                     
                     var sensor= readingData.data.sensorID;                   
                                      
                      angular.forEach(data.sdata, function(sdata, keyc){ 
                      if(sdata.type=='Temp'){
                         temp.rows[index].c.push({'v' : parseFloat(sdata.value)}); 
                       }else{
                        level.rows[index].c.push({'v' : parseInt(sdata.value)}); 
                       }
                                   
                      });// eof sdata
                    
                    });//eof data
                })//eof reading data;

              //push temp array to graph array  
              $scope.graphTemprature[myIndex].data['rows'] =temp['rows'];
              $scope.graphLevel[myIndex].data['rows'] =level['rows'];
              //defining chart type
              $scope.graphTemprature[myIndex].type = 'AreaChart';
              $scope.graphLevel[myIndex].type = 'AnnotationChart';
              
              if(addCol ==true){                        
                $scope.graphTemprature[myIndex].data.cols.push({id: "t02", label: "Temp 02 ", type: "number"})
                $scope.graphLevel[myIndex].data.cols.push({id: "l02", label: "Level 02 ", type: "number"})              
            }
              //setting chart options
              
              $scope.graphTemprature[myIndex].options = {
                  'title' : 'Temprature',
                  'legend': { 'position': 'bottom' },
                   "fill": 20,        
                  "vAxis": { "title": "Degree Celcius(℃)" },
                  "animation" : {
                        'startup' : true,
                        'duration': 400,
                       'easing': 'inAndOut',                      
                  },
                  "chartArea" :{
                    'backgroundColor' :
                    {'stroke': 'green'}
                    
                  },
                  'colors': ['red','green'],
                  'pointSize': 10,
                   explorer: {
                        axis: 'horizontal',
                        keepInBounds: true,
                        maxZoomIn: 0.1,
                        maxZoomOut: 4

                    },
                    hAxis : {
                      format : 'HH:mm'
                    }
                  /*'zoomStartTime' : new Date(),                  
                  'displayAnnotations' : true,
                  'displayAnnotationsFilter' :true,
                  'annotationsWidth' : 20,
                  //'scaleColumns' : [1,2],
                  'allValuesSuffix' : '  ℃',
                  'scaleType' : 'allmaximized'*/
                  
                          
                  
              };
              $scope.graphLevel[myIndex].options = {
                'title': 'Level',
                'legend': { 'position': 'bottom' },
                 "fill": 20,        
                "vAxis": {"title": "Percentage(%)" },
                "animation" : {
                        'startup' : true,
                        'duration': 400,
                       'easing': 'inAndOut',                      
                  },
                  "chartArea" :{
                    'backgroundColor' :
                    {'stroke': 'blue'}
                    
                  },
                  'colors': ['blue'],
                   'pointSize': 10,
                  'zoomStartTime' : new Date(),                  
                  'displayAnnotations' : true,
                  'displayAnnotationsFilter' :true,
                  'annotationsWidth' : 20,
                  //'scaleColumns' : [1,2],
                  'allValuesSuffix' : '%',
                  'scaleType' : 'allmaximized'

              };
                   console.log($scope.graphTemprature[myIndex]);
          }); 

   //eof set graph
  }}})

/*    setGraph:function($scope,$filter){
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
  

  
 