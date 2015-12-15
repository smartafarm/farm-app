
<div modal="showModal" close="cancel()" >
  <form name="editFname">
    <div class="modal-header">
        <h4> Serial No : {{ selectedDevice._id }}</h4>
    </div>
    <div class="modal-body">      
        <div class="row">
          <label>New device name : </label>
          <input name="fname"  ng-model="newfname" ng-init="newfname = selectedDevice.name" required/>
          <span ng-if="editFname.fname.$touched && editFname.fname.$error.required"> Device Name cannot be blank ! </span>
        </div>
        <div class="row">
          <label>Desciption : {{ selectedDevice.Desc }}</label>
        </div> 
        <div class="row" ng-repeat="sensorInfo in selectedDevice.sensor">
          <label>Sensor # {{sensorInfo.id}} </label>
          <input name="{{sensorInfo.id}}"  ng-model="sensorUpdate[$index]['fname']" ng-init="sensorUpdate[$index] = {'fname' : sensorInfo.fname ,'id' : sensorInfo.id } " required/>        
          <span ng-if="editFname[sensorInfo.id].$touched && editFname[sensorInfo.id].$error.required"> Sensor Name cannot be Blank ! </span>  
        </div>
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-success" ng-click="ok()" ng-disabled = "editFname.$invalid || editFname.$pristine">Update</button>
      <button class="btn" ng-click="cancel()">Cancel</button>
    </div>
  </form>
</div>

