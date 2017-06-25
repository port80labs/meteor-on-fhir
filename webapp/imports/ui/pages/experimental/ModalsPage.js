//  Sensitivity and Specificity
//  https://en.wikipedia.org/wiki/Sensitivity_and_specificity
//  https://en.wikipedia.org/wiki/Pre-_and_post-test_probability

//  Note: This calculator currently doesn't calculate the number of significant digits correctly
//  and may produce results that are overly precise

import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {blue500, orange500} from 'material-ui/styles/colors';
import {blue600, gray600, green600, orange600, red600, yellow600} from 'material-ui/styles/colors';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { GlassCard } from '/imports/ui/components/GlassCard';
import LinearProgress from 'material-ui/LinearProgress';
import PatientTable from '/imports/ui/workflows/patients/PatientTable';
import PractitionerTable from '/imports/ui/workflows/practitioners/PractitionerTable';
import Radium from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Spacer from '/imports/ui/components/Spacer';
import TextField from 'material-ui/TextField';
import TransferToPractitionerDialog from '/imports/ui/workflows/practitioners/TransferToPractitionerDialog';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

const style = {
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
};


Session.setDefault('open', false);
Session.setDefault('patientDialogOpen', false);

export class ModalsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  changeInput(variable, event, value){
    Session.set(variable, value);
  }

  openErrorRecovery(){
    Session.set('patientDialogOpen', true);
  }
  openTutorialOverlay(){
    Session.set('patientDialogOpen', true);
  }
  handleOpenPatients(){
    Session.set('patientDialogOpen', true);
  }

  handleOpen(){
    Session.set('open', true);
  }

  handleClose(){
    Session.set('open', false);
  }
  handleClosePatients(){
    Session.set('patientDialogOpen', false);
  }
  handleOpenPractitioners(){
    Session.set('practitionerDialogOpen', true);
  }  

  getMeteorData() {
    let data = {
      flare: Session.get('flare'),
      dialog: {
        open: Session.get('open')
      },
      patientDialog: {
        open: Session.get('patientDialogOpen'),
        patient: {
          display: '',
          reference: ''
        }
      }
    };

    let PatientButton = <FlatButton label="Patients" primary={true} onTouchTap={this.handleClose} />

    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  }

  render(){
    const actions = [
      <FlatButton
        label="Contact 911"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Medical Chart"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Location"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Acknowledge"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
    const patientActions = [
      <FlatButton
        label="Clear"
        primary={true}
        onTouchTap={this.handleClosePatients}
      />,
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClosePatients}
      />
    ];


    return (
      <div>
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Alerts"
            />
            <CardText>
              <RaisedButton label="Error Recovery Alert" onTouchTap={this.handleOpen} style={{marginRight: '20px'}} />
              <RaisedButton label="Tutorial Overlay" onTouchTap={this.openTutorialOverlay} />
              <Dialog
                icon={ <ActionAndroid /> }
                actions={actions}
                modal={false}
                open={this.data.dialog.open}
                onRequestClose={this.handleClose}
              >
                <CardHeader
                  title='Vital Signs Alert'
                  subtitle="Jane Doe / F / 45 years"
                  avatar={<ActionFavoriteBorder style={{height: '64px', width: '64px', color: red600}}/>}
                  titleStyle={{fontSize: '120%', color: red600}}
                  subtitleStyle={{fontSize: '120%'}}
                />

                <Divider style={{marginTop: '10px', marginBottom: '10px'}}/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget ornare ipsum. Quisque id varius neque. Proin sit amet justo vitae quam iaculis euismod. Aenean ut congue tellus, at rutrum augue. Vivamus interdum, turpis ac ullamcorper pulvinar, dolor ante placerat enim, non tincidunt metus justo quis sapien. Ut eu odio ornare, varius urna sed, interdum diam. Duis luctus, odio eget pellentesque bibendum, elit magna euismod neque, a mattis sem augue ut erat.

              </Dialog>

              </CardText>
            </GlassCard>
            <Spacer />





            <GlassCard>
              <CardTitle
                title="Patient Pick List"
              />
              <CardText>

              <TextField
                hintText="Jane Doe"
                errorText="Patient Search"
                onChange={this.changeInput.bind(this, 'description')}
                value={this.data.patientDialog.patient.display}
                fullWidth>
                  <FlatButton
                    label="Patients"
                    className="patientsButton"
                    primary={true}
                    onTouchTap={this.handleOpenPatients}
                    icon={ <AccountCircle /> }
                    style={{textAlign: 'right', cursor: 'pointer'}}
                  />
                </TextField>

              <Dialog
                title="Patient Search"
                actions={patientActions}
                modal={false}
                open={this.data.patientDialog.open}
                onRequestClose={this.handleClosePatients}
              >
                <CardText style={{overflowY: "auto"}}>
                <TextField
                  hintText="Jane Doe"
                  errorText="Patient Search"
                  onChange={this.changeInput.bind(this, 'description')}
                  value={this.data.patientDialog.patient.display}
                  fullWidth />
                  <PatientTable />
                </CardText>
              </Dialog>
            </CardText>
          </GlassCard>
          <Spacer />

          


            <GlassCard>
              <CardTitle
                title="Practitioner Pick List"
              />
              <CardText>

              <TextField
                hintText="Jane Doe"
                errorText="Practitioner Search"
                onChange={this.changeInput.bind(this, 'description')}
                //value={this.data.practitionerDialog.practitioner.display}
                fullWidth>
                  <FlatButton
                    label="Practitioners"
                    className="practitionerButton"
                    primary={true}
                    onTouchTap={this.handleOpenPractitioners}
                    icon={ <AccountCircle /> }
                    style={{textAlign: 'right', cursor: 'pointer'}}
                  />
                </TextField>

              <TransferToPractitionerDialog />
            </CardText>
          </GlassCard>
          <Spacer />



          <GlassCard>
            <CardTitle
              title="Progress"
            />
            <CardText>
              <LinearProgress mode="indeterminate" />
              <div style={{width: '100%', textAlign: 'center', paddingTop: '20px'}}>
                <RefreshIndicator
                  size={50}
                  left={0}
                  top={0}
                  status="loading"
                  style={style.refresh}
                />
              </div>
            </CardText>
          </GlassCard>
        </VerticalCanvas>


      </div>
    );
  }
}
ReactMixin(ModalsPage.prototype, ReactMeteorData);
