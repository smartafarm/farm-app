<div modal="showModal" close="cancel()">
  <form name="editFname">
    <div class="modal-header">
        <h4> Serial No : {{ selectedDevice._id }}</h4>
    </div>
    <div class="modal-body">      
        <div>
          <label>New device name : </label>
          <input name="fname"  ng-model="newfname" required/>
          <span ng-if="editFname.fname.$touched && editFname.fname.$error.required"> Device Name cannot be blank ! </span>
        </div>
        <div>
          <label>Desciption : {{ selectedDevice.Desc }}</label>
        </div> 
    </div>
    <div class="modal-footer">
      <button class="btn btn-success" ng-click="ok()" ng-disabled = "editFname.$invalid">Update</button>
      <button class="btn" ng-click="cancel()">Cancel</button>
    </div>
  </form>
</div>
