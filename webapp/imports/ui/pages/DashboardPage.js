import { CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';

import {AreaChart} from 'react-easy-chart';
import {BarChart} from 'react-easy-chart';
import { BarStackChart } from 'react-d3-basic';
import { CollectionManagement } from '/imports/ui/components/CollectionManagement';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import {PieChart} from 'react-easy-chart';
import { Posts } from '/imports/api/posts/posts';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import {ScatterplotChart} from 'react-easy-chart';
import Spacer from '/imports/ui/components/Spacer';
import { Statistics } from '/imports/api/statistics/statistics';
import { Topics } from '/imports/api/topics/topics';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { moment } from 'meteor/momentjs:moment';

const ReactHighcharts = require('react-highcharts');


const config = {
  chart: {
    // backgroundColor: {
    //   linearGradient: [0, 0, 0, 400],
    //   stops: [ [0, 'rgb(248, 248, 248)'],
    //   [1, 'rgb(255, 255, 255)'] ]
    // }
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    // data: Statistics.find().map(function(datum){
    //   return datum.usersCount;
    // })
  }]
};

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      palette: {},
      style: {
        summaryCards: {
          display: 'inline-block'
        }
      },
      barchart: {
        width: '350px'
      },      
      state: {
        usersCount: 0,
        postsCount: 0,
        topicsCount: 0,
        patientsCount: 0,
        practitionersCount: 0
      },
      config: {
        chart: {
          title: {
            text: 'History'
          }
          // backgroundColor: {
          //   linearGradient: [0, 0, 0, 400],
          //   stops: [ [0, 'rgb(248, 248, 248)'],
          //   [1, 'rgb(255, 255, 255)'] ]
          // }
        },
        xAxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          categories: Statistics.find().map(function(datum){
            return moment(datum.date).format('MMM DD');
          })
        },
        // series: [{
        //   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        // }]
        series: [{
          name: 'Users',
          data: Statistics.find().map(function(datum){
            return datum.usersCount;
          })
        }, {
          name: 'Posts',
          data: Statistics.find().map(function(datum){
            return datum.postsCount;
          })
        }, {
          name: 'Topics',
          data: Statistics.find().map(function(datum){
            return datum.topicsCount;
          })
        }, {
          name: 'Patients',
          data: Statistics.find().map(function(datum){
            return datum.patientsCount;
          })
        }, {
          name: 'Practitioners',
          data: Statistics.find().map(function(datum){
            return datum.practitionersCount;
          })
        }]
      }
    };

    data.state.usersCount = Meteor.users.find().count();
    data.state.patientsCount = Patients.find().count();
    data.state.practitionersCount = Practitioners.find().count();
    data.state.postsCount = Posts.find().count();
    data.state.topicsCount = Topics.find().count();

    if (Session.get('appWidth') < 1024) {
      data.style.summaryCards.display = 'none';
    }

    // theming palette
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.theme && Meteor.settings.public.theme.palette ){
      data.palette = Meteor.settings.public.theme.palette;
    }

    // graph widths
    data.barchart.width = (0.33 * Session.get('appWidth')) - 60;

    return data;
  }

  render(){
    return(
      <div id='dashboardPage'>
        <VerticalCanvas width='wide'>

          <Row>
            <Col md={2}>
              <GlassCard style={{paddingBottom: '0px', position: 'relative'}}>
                <CardTitle title='Weight' titleStyle={{color: 'black', float: 'right'}} />
                <CardText >
                  <h1 style={{color: 'black'}}>0</h1>
                </CardText>
              </GlassCard>
              <Spacer />
              <GlassCard style={{paddingBottom: '0px', position: 'relative'}}>
                <CardTitle title='Body Mass Index' titleStyle={{color: 'black', float: 'right'}} />
                <CardText >
                  <h1 style={{color: 'black'}}>0</h1>
                </CardText>
              </GlassCard>
              <Spacer />
              <GlassCard style={{paddingBottom: '0px', position: 'relative'}}>
                <CardTitle title='Resting Heart Rate' titleStyle={{color: 'black', float: 'right'}} />
                <CardText >
                  <h1 style={{color: 'black'}}>0</h1>
                </CardText>
              </GlassCard>
              <Spacer />
              <GlassCard style={{paddingBottom: '0px', position: 'relative'}}>
                <CardTitle title='Blood Pressure' titleStyle={{color: 'black', float: 'right'}} />
                <CardText >
                  <h1 style={{color: 'black'}}>0</h1>
                </CardText>
              </GlassCard>
            </Col>
            <Col md={4}>
                <GlassCard >
                  <CardTitle title='Exercise Mix' subtitle={ moment(this.data.date).format('YYYY/MM/DD')} titleStyle={{color: 'black'}}   /> 
                  <CardText style={{height: 300}}>
                    <PieChart
                      id='averageNumBedsChart'
                      size={200}
                      innerHoleSize={160}
                      data={[
                        { key: 'A', value: 10, color: this.data.palette.colorA },
                        { key: 'B', value: 20, color: this.data.palette.colorB },
                        { key: 'C', value: 30, color: this.data.palette.colorC }
                      ]}
                      styles={{float: 'right', textAlign: 'center', marginLeft: '20px'}}
                    />  
                  
                  </CardText>
                </GlassCard>
              
                <Spacer />
               
               <GlassCard >
                  <CardTitle title='Weight History' subtitle='subtitle' titleStyle={{color: 'black' }}   />
                  <CardText >
                    <AreaChart
                      width={this.data.barchart.width}
                      height={260}
                      axes
                      interpolate={'cardinal'}
                      dataPoints
                      grid
                      areaColors={[ 'gray', this.data.palette.colorD, 'gray' ]}
                      xTicks={5}
                      yTicks={3}
                      data={[ [
                          {x: 1, y: 75},
                          {x: 2, y: 74.5},
                          {x: 3, y: 74},
                          {x: 4, y: 73.5},
                          {x: 5, y: 72},
                          {x: 6, y: 72.5},
                          {x: 7, y: 72},
                          {x: 8, y: 71.5},
                          {x: 9, y: 71},
                          {x: 10, y: 70.5},
                          {x: 11, y: 70},
                          {x: 12, y: 70}
                        ]]}                      
                      />
                  </CardText>
                </GlassCard>                 
              
              


                
            </Col>
            <Col md={2}>
              <GlassCard>
                  <CardTitle title='Eyesight' titleStyle={{color: 'black', float: 'right'}} style={{backgroundColor: this.data.palette.colorB}} />
                  <CardText style={{backgroundColor: this.data.palette.colorB}}>
                    <h1>20/20</h1>
                  </CardText>
                </GlassCard>

                <Spacer />
                <GlassCard>
                  <CardTitle title='Mile Time' titleStyle={{color: 'black', float: 'right'}} style={{backgroundColor: this.data.palette.colorB}}/>
                  <CardText style={{backgroundColor: this.data.palette.colorB}}>
                    <h1>10 min</h1>
                  </CardText>
                </GlassCard>
            </Col>
          </Row>
            
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(DashboardPage.prototype, ReactMeteorData);
