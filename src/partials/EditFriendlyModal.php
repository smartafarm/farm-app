
<div modal="showModal" close="cancel()" >
  <form name="editFname">
    <div class="modal-header">
      <div class="row">
        <div class="col-md-4">
          <h4> Serial No : {{ selectedDevice._id }}</h4>
        </div>
        
      </div>
    </div>
    <div class="modal-body">  
      <div class="row" style="margin-top: 8px;">
          <div class="col-md-12 ">
            <label>Device</label><hr style="margin-top: 0px;"> 
          </div>        
      </div>   
        
        <div class="row">
          <div class="col-xs-2 col-sm-3 col-md-3  ">
            <label>Name</label>
          </div>
          <div class="col-xs-7 col-xs-offset-2 col-sm-6 col-md-6 ">
            <input name="fname"  ng-model="newfname" ng-init="newfname = selectedDevice.name" required/>
            <span ng-if="editFname.fname.$touched && editFname.fname.$error.required"> Device Name cannot be blank ! </span>
          </div>            
        </div>        
        <div class="row" style="margin-top: 8px;">
          <div class="col-xs-2 col-sm-3  col-md-3 ">
            <label>Description </label>
          </div>
          <div class="col-xs-7 col-xs-offset-3 col-sm-6 col-sm-offset-2 col-md-6 ">
           <label>{{ selectedDevice.Desc }}</label>
          </div>
        </div> 
       <div class="row" style="margin-top: 8px;">
          <div class="col-md-12">
            <label>Sensor</label>        
            <button style="margin-left: 15px;" ng-click="addSensor()" ng-disabled="addSensorbtn"><i class="fa fa-plus"></i></button>        
            <hr style="margin-top: 0px;">
          </div>        
      </div> 
        <div class="row" ng-repeat="sensorInfo in selectedDevice.sensor">
            <div class="col-xs-7 col-sm-3 col-sm-offset-0 col-md-3 ">
              <label>Sensor # {{sensorInfo.id}} </label>
            </div>
            <div class="col-sm-7 col-sm-offset-2 col-md-6 ">
              <input name="{{sensorInfo.id}}"  ng-model="sensorUpdate[$index]['fname']" ng-init="sensorUpdate[$index] = {'fname' : sensorInfo.fname ,'id' : sensorInfo.id } " required/>        
              <span ng-if="editFname[sensorInfo.id].$touched && editFname[sensorInfo.id].$error.required"> Sensor Name cannot be Blank ! </span>  
            </div>
        </div>





        <div class="row" ng-repeat="sensorInfo in newSensor" >
          
            <div class="col-xs-7 col-sm-3 col-sm-offset-0 col-md-4 ">
              <label>Sensor #</label> 
              <input name="sensorInfo.id"  ng-model="newSensor[$index]['id']" style="width:60px" required/>        
            </div>
            <div class="col-sm-7 col-sm-offset-2 col-md-6 col-md-offset-1 ">
              <input name="sensorInfo.fname"  ng-model="newSensor[$index]['fname']"  required/> 
              <button style="margin-left: 15px;" save-sensor ng-disabled="editFname.$invalid || editFname.$pristine"><i class="fa fa-check-square-o"></i></button>        
            </div>
          </div>
        
        
    </div>



    
    <div class="modal-footer">
      <button class="btn btn-success" ng-click="ok()" ng-disabled = "editFname.$invalid || editFname.$pristine">Update</button>
      <button class="btn" ng-click="cancel()">Cancel</button>
    </div>
  </form>
</div>

