.controller('manageAssetCtrl',[
	'$scope',
	'$uibModalInstance',
	'device',
	'adminService',
	'Notification',
  function ($scope,$uibModalInstance,device,adminService,Notification) {  

    $scope.newAsset = {};  
    $scope.add = {};
    $scope.showNewAsset = false;
    $scope.device = device[0];
    $scope.selectedDevices = {};
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };  
    $scope.saveNewAsset=function(){  

      //send asset id and sensor id for check
      adminService.getData('admin/check/assetid?aid='+$scope.newAsset.id+'&sid='+$scope.newAsset.assigned+'&did='+device[0].id).then(function(response){        
       if(response){
        if(response.aid == 1){
          Notification.info({message : 'Asset Exists' ,delay : 3000})
        }else if(response.sid == 1){ 
          Notification.info({message : 'Sensor Serial already exists' ,delay : 3000})
        }else{
            //creating array for pushing
            $scope.newAsset.sensor =[];
            $scope.newAsset.sensor.push($scope.newAsset.assigned);
            var send = {}
            send.did = device[0].id;
            send.asset = $scope.newAsset;
            //saving server side
            adminService.submit('admin/update/newasset',send).then(function(response){
             if(response){
              if(response.n ==1){                  
                $scope.device.asset.push($scope.newAsset);
                Notification.success({message : 'Asset Added' ,delay : 3000})
                      //resetting properties
                      $scope.newAsset = {};
                      $scope.newAsset.fname = "Friendly Name";
                      $scope.showNewAsset = false;
                    }                    
              else{Notification.error({message : 'Update Failed , Contact System Administrator' ,delay : 3000})}//eof response.ok*/
            }//eof response
        })           
          }
        } 
      },function(response){
       Notification.error({message : 'Server error. Please try again' ,delay : 3000})
     })
}

  //save new sensor to asset
  $scope.saveSensor=function(panel){
    adminService.getData('admin/check/sensor?sid='+panel.newsensor+'&did='+device[0].id).then(function(response){

     if(response){
      if(response.sid == 1){ 
        Notification.info({message : 'Sensor Serial already exists' ,delay : 3000})
      }else{
            //saving data on backend          
            var send = {}
            send.did = device[0].id;
            send.sid = panel.assetInfo.id;
            send.addsensor = panel.newsensor;
            adminService.submit('admin/update/sensor',send).then(function(response){
              if(response){
                if(response.n ==1){                  
                  angular.forEach(device[0].asset,function(value,key){
                    if(value.id === send.sid){                        
                      value.sensor.push(send.addsensor);
                      Notification.success({message : 'Sensor added' ,delay : 3000})
                      panel.showNewSensor = false;
                    }
                  })
              }else{Notification.error({message : 'Update Failed , Contact System Administrator' ,delay : 3000})}//eof response.n
            }//eof response

          })
          }
        } 
      },function(response){
       Notification.error({message : 'Server error. Please try again' ,delay : 3000})
     })
}


$scope.ok = function() {  
  $uibModalInstance.dismiss('cancel');  
};



}])