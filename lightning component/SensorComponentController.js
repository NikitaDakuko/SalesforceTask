({
    doinit : function(component) {
        component.set('v.EventColumns', [
            {label: 'X', fieldName: 'x__c', type: 'number'},
            {label: 'Y', fieldName: 'y__c', type: 'number'},
            {label: 'Z', fieldName: 'z__c', type: 'number'},
            {label: 'Modulus difference', fieldName: 'Modulus_difference_Vectors__c', type: 'number'}
             
        ]);
               
        var action = component.get("c.getSensorID");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS")
                component.set("v.pickSensor", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    onControllerFieldChange : function(component){
        var sensorid = component.find("PicklistId").get("v.value");
        
        var action = component.get("c.getEvents");
        action.setParams({sensorid : sensorid});
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") 
                component.set("v.SensorEventData",  response.getReturnValue());
        });
        $A.enqueueAction(action);
        
        var action = component.get("c.getMaxDifference");
        action.setParams({sensorid : sensorid});
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS")
                component.set("v.MaxDifference",  response.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})
