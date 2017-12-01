// http://visjs.org/docs/timeline/index.html
// https://github.com/Lighthouse-io/react-visjs-timeline
// http://visjs.org/examples/timeline/interaction/animateWindow.html
// http://visjs.org/docs/timeline/#Configuration_Options

import React, { Component } from 'react';
//import Timeline from 'react-visjs-timeline';
import Timeline from '../components/Timeline';
import moment from 'moment';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { has, get } from 'lodash';

export class TimelineSidescrollPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      options: {
        width: '100%',
        height: (Session.get('appHeight') - 128)+ 'px',
        stack: true,
        showMajorLabels: true,
        showCurrentTime: true,
        zoomMin: 1000000,
        //type: 'background',
        format: {
          minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
          }
        },
        start: '1978-01-25',
        end: '2018-01-01',
        min: '1977-01-01',
        max: '2022-01-01', 
        groupOrder: 'content'  // groupOrder can be a property name or a sorting function'
      },
      groups: [],
      items: []
    }

    if(Meteor.userId()){
      data.items = get(Meteor.user(), 'profile.timeline');
    }



    const now = moment().minutes(0).seconds(0).milliseconds(0)
    
      // create a data set with groups
    const names = ['Conditions', 'Medications', 'Observations', 'Procedures', "CarePlans", "Allergies", "Immunizations", "Imaging Studies"]
    for (let g = 0; g < names.length; g++) {
      data.groups.push({ id: names[g], content: names[g] })
    }

    return data;
  }
  render(){
    return(
      <div id="horizontalTimeline" style={{paddingTop: '64px', paddingBottom: '64px'}}>
        <Timeline options={this.data.options} items={this.data.items} groups={this.data.groups} />
      </div>
    );
  }
}
ReactMixin(TimelineSidescrollPage.prototype, ReactMeteorData);