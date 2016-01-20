
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
            <button ng-show="newfname != selectedDevice.name" 
                        class="fa fa-check" 
                        style="color:green"
                        tooltip-placement="top"
                        uib-tooltip ="Save"
                        tooltip-popup-delay='400'
                        ng-click="saveDeviceName(this)"
                        ></button> 
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
            <!-- <button style="margin-left: 15px;" ng-click="addSensor()" ng-disabled="addSensorbtn"><i class="fa fa-plus"></i></button>         -->
            <hr style="margin-top: 0px;">
          </div>        
      </div> 
        <div class="row" ng-repeat="assetInfo in selectedDevice.asset">
         <div class="col-md-10 col-md-offset-1">
         <div class="panel panel-default ">
           <div class="panel-heading">
            <label><i> {{assetInfo.id}}  </i></label>
           </div> 
           <div class="row" > 
             <div class="panel-body">
               <div class="col-md-12"> 
                 <label># {{assetInfo.assigned}} </label>
                <input name="{{assetInfo.id}}"  ng-model="fnameUpdate" ng-init="fnameUpdate = assetInfo.fname" required/>  
                <button ng-show="fnameUpdate != assetInfo.fname" 
                        class="fa fa-check" 
                        style="color:green"
                        tooltip-placement="top"
                        uib-tooltip ="Save"
                        tooltip-popup-delay='400'
                        ng-click="saveSensor(this)"
                        ></button>      
                <span ng-if="editFname[assetInfo.id].$touched && editFname[assetInfo.id].$error.required" style="color: red"> Sensor Name cannot be Blank ! </span>                
              </div>
            </div>
          </div>
        </div> 
      </div> 
            
        </div>



        
    </div>



    
    <div class="modal-footer">
   
      <button class="btn" ng-click="cancel()">Close</button>
    </div>
  </form>
</div>

