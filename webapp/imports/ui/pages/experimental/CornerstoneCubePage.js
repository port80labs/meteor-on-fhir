//  https://codepen.io/banjeremy/pen/wMvYLE
// may need to removed {position: 'fixed} statements in rest of DOM

import { CardActions, CardHeader, CardText } from 'material-ui/Card';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Image } from '/imports/ui/components/Image';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import EventListener, {withOptions} from 'react-event-listener';

Session.setDefault('scrollY', 0);
export class CornerstonePage extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { scrollPosition: window.scrollY };
  }
  getMeteorData() {
    let data = {
      style: {},
      state: { scrollPosition: Session.get('scrollY') }
    };
    console.log('CornerstonePage[data]', data)
    return data;
  }
  // componentWillMount() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
  // }
  
  // handleScroll() {
  //   console.log('handleScroll', window.scrollY)
  // }
  handleResize (){
    console.log('resize');
  }
 
  handleScroll(){
    console.log('scroll');
    Session.set('scrollY', window.scrollY)
    // this.setState({ scrollPosition: window.scrollY });
  }
 
  handleMouseMove() {
    console.log('mousemove');
  }
  render(){
    return(
      <div id="CornerstonePage" style={{position: 'fixed'}}>
          <div>
            <div className="container">
              <EventListener
                target="window"
                onResize={this.handleResize}
                onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}
              />
                <Cube size={400} rotation={this.data.state.scrollPosition} />
              <EventListener target={document} onMouseMoveCapture={this.handleMouseMove} />

            </div>
          </div>

        <VerticalCanvas>
          <GlassCard>
            <CardText>
              <Image />              
            </CardText>
          </GlassCard>
          
        </VerticalCanvas>
      </div>
    );
  }
}
ReactMixin(CornerstonePage.prototype, ReactMeteorData);





class Cube extends React.Component {
  render() {
    var cubeStyle = {
      width: this.props.size + 'px',
      height: this.props.size + 'px',
      transform: `rotateY(${this.props.rotation}deg)`
    };
    
    return (
      <div className="cube" style={cubeStyle}>
        <div className="front" style={{backgroundColor: 'red'}}>
          <Image />              
        </div>
        <div className="back"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
    );
  }
}

