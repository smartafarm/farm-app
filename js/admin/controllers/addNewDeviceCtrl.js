.controller('addNewDeviceCtrl',[
	'$scope',
	'$uibModalInstance',	
	'$interval',
	'adminService',
	'myData',
  'Notification',
  function ($scope,$uibModalInstance,$interval,adminService,myData,Notification) {  
   
  $scope.user ={};
  $scope.device = {}; // initiating new device
  $scope.checkName = function(){
    if($scope.device.id){
      adminService.getData('admin/check/device?did='+ $scope.device.id).then(function(response){
        if(response){
          response.did != 1 ? $scope.nameIsvalid = true : $scope.nameIsvalid = false
        }
      })
    }
    
  }

  
  $scope.ok = function() {   
    $scope.device.EquipTypeID = 'c1';
    $scope.device.asset = [];      
    adminService.submit('admin/addDevice',$scope.device).then(function(response){
      myData.push($scope.device);
      if(response.ok == 1){
        Notification.success({message:'Device Added'})        }         
        $uibModalInstance.dismiss('cancel');
      })
  };

  $scope.cancel = function() {
    
   $uibModalInstance.dismiss('cancel');
 };	
 
 

}])
