import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

let defaultDevice = {
  "resourceType": "Device",
  "identifier": [{
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/identifier-type",
          "code": "SNO"
        }
      ],
      "text": "Serial Number"
    },
    "value": ""
  }],
  "type": {
    "text": ""
  },
  "status": "available",
  "manufacturer": "",
  "model": "",
  "lotNumber": "",
  "contact": [{
    "resourceType": "ContactPoint",
    "system": "phone",
    "value": ""
  }]
};

Session.setDefault('deviceUpsert', false);
Session.setDefault('selectedDevice', false);


export default class DeviceDetail extends React.Component {
  getMeteorData() {
    let data = {
      deviceId: false,
      device: defaultDevice
    };

    if (Session.get('deviceUpsert')) {
      data.device = Session.get('deviceUpsert');
    } else {
      if (Session.get('selectedDevice')) {
        data.deviceId = Session.get('selectedDevice');
        console.log("selectedDevice", Session.get('selectedDevice'));

        let selectedDevice = Devices.findOne({_id: Session.get('selectedDevice')});
        console.log("selectedDevice", selectedDevice);

        if (selectedDevice) {
          data.device = selectedDevice;
        }
      } else {
        data.device = defaultDevice;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="deviceDetail">
        <CardText>
          <TextField
            id='deviceTypeInput'
            ref='deviceType'
            name='deviceType'
            floatingLabelText='Device Type'
            value={this.data.device.type ? this.data.device.type.text : ''}
            onChange={ this.changeState.bind(this, 'deviceType')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerInput'
            ref='manufacturer'
            name='manufacturer'
            floatingLabelText='Manufacturer'
            value={this.data.device.manufacturer ? this.data.device.manufacturer : ''}
            onChange={ this.changeState.bind(this, 'manufacturer')}
            fullWidth
            /><br/>
          <TextField
            id='deviceModelInput'
            ref='deviceModel'
            name='deviceModel'
            floatingLabelText='Model'
            value={this.data.device.model ? this.data.device.model : ''}
            onChange={ this.changeState.bind(this, 'deviceModel')}
            fullWidth
            /><br/>
          <TextField
            id='serialNumberInput'
            ref='serialNumber'
            name='serialNumber'
            floatingLabelText='Serial Number'
            value={this.data.device.identifier[0] ? this.data.device.identifier[0].value :  ''}
            onChange={ this.changeState.bind(this, 'serialNumber')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.deviceId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(deviceId){
    if (deviceId) {
      return (
        <div>
          <RaisedButton id="saveDeviceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteDeviceButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveDeviceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let deviceUpdate;

    if(process.env.NODE_ENV === "test") console.log("DeviceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new device
    if (Session.get('deviceUpsert')) {
      deviceUpdate = Session.get('deviceUpsert');
    } else {
      deviceUpdate = defaultDevice;
    }



    // if there's an existing device, use them
    if (Session.get('selectedDevice')) {
      deviceUpdate = this.data.device;
    }

    switch (field) {
      case "deviceType":
        deviceUpdate.type.text = value;
        break;
      case "manufacturer":
        deviceUpdate.manufacturer = value;
        break;
      case "deviceModel":
        deviceUpdate.model = value;
        break;
      case "serialNumber":
        deviceUpdate.identifier[0].value = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("deviceUpdate", deviceUpdate);
    Session.set('deviceUpsert', deviceUpdate);
  }

  handleSaveButton(){
    let deviceUpdate = Session.get('deviceUpsert', deviceUpdate);

    if(process.env.NODE_ENV === "test") console.log("deviceUpdate", deviceUpdate);


    if (Session.get('selectedDevice')) {
      if(process.env.NODE_ENV === "test") console.log("Updating device...");
      delete deviceUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      deviceUpdate.resourceType = 'Device';

      Devices.update(
        {_id: Session.get('selectedDevice')}, {$set: deviceUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Devices", recordId: Session.get('selectedDevice')});
            Session.set('devicePageTabIndex', 1);
            Session.set('selectedDevice', false);
            Session.set('deviceUpsert', false);
            Bert.alert('Device updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new device", deviceUpdate);

      Devices.insert(deviceUpdate, function(error, result) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Devices", recordId: result});
          Session.set('devicePageTabIndex', 1);
          Session.set('selectedDevice', false);
          Session.set('deviceUpsert', false);
          Bert.alert('Device added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('devicePageTabIndex', 1);
  }

  handleDeleteButton(){
    Device.remove({_id: Session.get('selectedDevice')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Devices", recordId: Session.get('selectedDevice')});
        Session.set('devicePageTabIndex', 1);
        Session.set('selectedDevice', false);
        Session.set('deviceUpsert', false);
        Bert.alert('Device removed!', 'success');
      }
    });
  }
}


DeviceDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(DeviceDetail.prototype, ReactMeteorData);
