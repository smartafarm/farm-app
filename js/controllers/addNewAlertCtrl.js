// Device friendly name editor contorller
// This is a controller for friendly name directive
.controller('addNewAlertCtrl',[
	'$scope',
	'$uibModalInstance',
	'selectedDevice',
	'deviceAlerts',
	'$timeout',
	
function ($scope,$uibModalInstance,selectedDevice,deviceAlerts,$timeout) { 

	      //setting temprature slider
	    
        $scope.alertTemp = {
            minValue: 5,
            maxValue: 20,
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
        $scope.alertLevel = {
          minValue: 10,
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
        $scope.alertTime = {
        minValue: 10,
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
	
	$scope.sensorUpdate =[];	
	$scope.cancel = function() {

	//closing modal on cancel click		
  	$uibModalInstance.dismiss('cancel');

	};	
	$scope.refreshSlider = function () {
    $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
    });
};
	$scope.refreshSlider();

	

   
        
  
}])
