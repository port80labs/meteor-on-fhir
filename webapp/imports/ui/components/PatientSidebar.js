import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { get } from 'lodash';



// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].SidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function(element){
      dynamicModules.push(element);      
    });    
  }
});

console.log('dynamicModules', dynamicModules)


export class PatientSidebar extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    return data;
  }

  handleLogout() {
    console.log("handleLogout");
    Meteor.logout();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }

  render () {

    //----------------------------------------------------------------------
    // Core Modules 

    var healthlog;

    if(get(Meteor, 'settings.public.modules.healthlog')){
      allergies = <IndexLinkContainer to='/weblog'>
        <ListItem primaryText='Healthlog' href='/weblog' />
      </IndexLinkContainer>;
    }


    //----------------------------------------------------------------------
    // Dynamic Modules  

    var dynamicElements = [];
    dynamicModules.map(function(element, index){ 

      // if(!element.hideFromSidebar){
        // good; can't turn this on/off
        dynamicElements.push(<IndexLinkContainer to={element.to} key={index}>
          <ListItem primaryText={element.primaryText} href={element.href} />
        </IndexLinkContainer>);

        // this is what we're trying to get to
        if(get(Meteor, 'settings.public.modules.fhir' + element.resourceType )){
          <IndexLinkContainer to={element.to} >
            <ListItem primaryText={element.primaryText} href={element.href} />
          </IndexLinkContainer> 
        }
      // }
    });

    console.log('dynamicElements', dynamicElements);

    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <IndexLinkContainer to='/'>
            <ListItem className="indexItem" href='/' primaryText='Index' />
          </IndexLinkContainer>

          <hr />

          { healthlog }              
          { dynamicElements }

          <hr />


          <IndexLinkContainer to='/theming'>
             <ListItem primaryText='Theming' href='/theming' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/about'>
             <ListItem primaryText='About' href='/about' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/signin'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </IndexLinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
