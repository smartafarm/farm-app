 <div style="font-size: 75%;">							
	<strong> Data Feeded : </strong>{{ reading.dt | date:'dd-MM-yyyy HH:mm:ss' }} 	
	<strong>Readings:</strong><span ng-repeat= "sensor in reading.data"> <i>Sensor ID :  {{sensor.sensorID }} </i> &nbsp
	<span ng-repeat= "sensorData in sensor.sdata"> {{sensorData | valueFilter}} 	</span></span>			   				
</div>