.factory('mygraphFactory', function()
  //Factory to prepare graph data for each device
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
              console.log($scope.graphLevel[myIndex]);
               
          }
        )}
}})  
