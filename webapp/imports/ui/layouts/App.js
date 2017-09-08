// base layout
import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {teal400, teal600} from 'material-ui/styles/colors';

import { Footer } from '/imports/ui/layouts/Footer';
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Header } from '/imports/ui/layouts/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { SciFiPage } from '/imports/ui/pages/SciFiPage';
import { Session } from 'meteor/session';
import { SinglePanelLayout } from '/imports/ui/layouts/SinglePanelLayout';
import { Spacer } from '/imports/ui/components/Spacer';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
// Material UI Theming
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { get } from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { moment } from 'meteor/momentjs:moment';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});

Session.setDefault('iFrameLocation', '');
Meteor.startup(function (){
  if (Meteor.settings.public.defaults.iFrameUrl) {
    Session.set('iFrameLocation', Meteor.settings.public.defaults.iFrameUrl);
  }
  if (Meteor.settings.public.defaults.iFrameEnabled) {
    Session.set('secondPanelVisible', Meteor.settings.public.defaults.iFrameEnabled);
  }
});


export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
  componentWillMount() {
    injectTapEventPlugin();
  }

  getMeteorData() {
    let data = {
      style: {
        secondary: {
          position: 'absolute',
          top: ' 0px',
          width: '1024px',
          left: '0',
          transition: '1s'
        },
        card: {
          position: 'relative',
          //minHeight: '768px',
          width: '1024px'
          //height: Session.get('appHeight') - 240 + 'px'
        },
        content: {
          minHeight: '728px',
          width: '970px',
          height: Session.get('appHeight') - 280 + 'px'
        }
      },
      browserWindowLocation: 'https://www.ncbi.nlm.nih.gov'
    };



    if (Session.get('iFrameLocation')) {
      data.browserWindowLocation = Session.get('iFrameLocation');
    }

    if (Session.get('secondPanelVisible')) {
      if (Session.get('appWidth') > 1200) {
        data.style.secondary.visibility = 'visible';
        data.style.secondary.left = '1024px';
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '4048px';
    }

    if(process.env.NODE_ENV === "test") console.log("GenomePage[data]", data);
    return data;
  }

  render(){
    var orbital;
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.nfcOrbital){
      orbital = <SciFiPage />;
    }

    return (
     <MuiThemeProvider muiTheme={muiTheme}>
      <GlassApp>
        <SinglePanelLayout>
          {orbital}
          <Header />
            <div className='primaryFlexPanel' >
              { this.props.children }
            </div>
            <div className='secondaryFlexPanel' style={this.data.style.secondary}>
              <VerticalCanvas>
                <GlassCard style={this.data.style.card} height='600'>
                  <img src='homeless1.png' style={{width: '400px', height: '100%', left: '0px', position: 'absolute',  objectFit: 'cover'}}/>
                  <CardText style={{marginLeft: '420px'}}>                    
                    <span style={{float: 'right', color: 'steelblue', fontSize: '112px', marginRight: '20px', position: 'absolute', top: '-30px', right: '30px'}}> 	&#8902; 	&#8902; 	&#8902; 	&#8902;</span>
                    <h3 style={{color: '#dddddd'}}>City of Chicago </h3>
                    <CardTitle title={ get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family')} titleStyle={{fontSize: '48px', left: '-40px'}} />
                    <h4>1955-01-18</h4>
                    <h4>1849 W. Cornelia Ave.</h4>
                    <h4>Chicago, IL  60618</h4>
                    <h4>Brown</h4>
                    <h4>Brown</h4>
                    <h4>5'6"</h4>
                    <h4>165lbs</h4>
                  </CardText>
                  <div style={{fontSize: '36px', bottom: '10px', position: 'absolute', paddingRight: '60px', right: '0px'}}>01-CAM-55-370441</div>
                </GlassCard>

                <Spacer />
                
                <GlassCard style={this.data.style.card} height='600'>
                  <CardHeader title={'City of Chicago'} style={{textAlign: 'left'}} />
                  <CardHeader title={'Issue Date: ' + moment().format("YYYY-MMM-DD")} style={{top: '0px', position: 'absolute', right: '0px', textAlign: 'right' }} />
                  <div style={{width: '100%', backgroundColor: 'silver', height: '100px'}}></div>
                  <CardText>
                    <h4 className='barcode' style={{textAlign: 'center', fontSize: '48px'}}>{ get(Meteor.user(), '_id') }</h4>
                    <h4 className='barcode' style={{textAlign: 'center', fontSize: '36px'}}>5782389748</h4>
                    <img src='fhir-logo-thumb.png' style={{width: '100px', bottom: 48, position: 'absolute'}}/>
                    <h2 style={{color: '#eeeeee', left: '100px', bottom: '32px', fontSize: '96px', position: 'absolute'}}>FHIR</h2>
                    <h2 style={{color: '#e20d19', bottom: 0, position: 'absolute'}}>Fast Healthcare Interoperability Resources</h2>
                  </CardText>
                </GlassCard>
              </VerticalCanvas>
            </div>
          <Footer />
        </SinglePanelLayout>
      </GlassApp>
     </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
App.defaultProps = {};

ReactMixin(App.prototype, ReactMeteorData);