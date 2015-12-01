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
  

  
 