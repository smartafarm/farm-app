.controller('alertsCtrl', [
	'$scope',
	'$rootScope',
	'userFactory',
  '$timeout',
	
 function ($scope,$rootScope,userFactory,$timeout) {
//getting global user properties

$rootScope.getuser.then(function(response){
	  $rootScope.user = response;		
	
  //function executiong after receiving user details
  userFactory.receive('alerts/getDevices').then(function(response){
    $scope.devices = response;
    $scope.device = $scope.devices[0];
    $scope.refreshData();
  })
	
})	
$scope.refreshSlider = function () {

    $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
    });
};

$scope.refreshData = function(){
  $scope.showResults = 'Loading...';
  userFactory.receive('alerts/getAlerts?did=' + $scope.device._id).then(function(response){
    $scope.alerts = [];
    if(response != ' '){
      $scope.showResults = 'Your Alerts';
      
      setAlerts(response);
    }else{
      $scope.showResults = 'No Alerts Yet !';
    }
  })

}





var setAlerts = function(response){

  if(response.length != 0){

      angular.forEach(response,function(value){

        //setting temprature slider
        var alertTemp = {
            minValue: parseFloat(value.temp.lthan),
            maxValue: parseFloat(value.temp.gthan),
            options: {
                floor: 0,
                ceil: 100,
                step: 1,
                showSelectionBar: true,
                getSelectionBarColor : function(value) {            
                    return 'blue'
                },
                translate: function(value) {
                  return  value+'℃' 
                }

            }
        };

        //Setting level slider
        var alertLevel = {
          minValue: value.level.increase,
          maxValue: 90,
          options: {
              floor: 0,
              ceil: 100,
              step: 1,
              showSelectionBar: true,
              getSelectionBarColor : function(value) {            
                  return 'green';
              },
              translate: function(value) {
                return  value +'%' 
              }
          }

      };
        // Setting Time Slider
        var alertTime = {
        minValue: value.duration.mins,
        maxValue: 60,
        options: {
            floor: 5,
            ceil: 60,
            step: 1,
            showSelectionBar: true,
            getSelectionBarColor : function(value) {            
                return 'yellow';
            },
            translate: function(value) {
              return  value +' mins' ;
            }
        }
      }

        $scope.alerts.push({'alertTime' : alertTime , 'alertTemp' : alertTemp , 'alertLevel' : alertLevel })
        
      })//eof response loop
  }
  
  
}

console.log($scope);
	
}])