import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

import { GlassCard, VerticalCanvas} from 'meteor/clinical:glass-ui';
import { CardText, CardTitle } from 'material-ui/Card';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { get } from 'lodash';

export class ZygotePage extends React.Component {
  constructor(props) {
    super(props);
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
          width: '1024px'
        },
        content: {
          minHeight: '728px',
          width: '970px',
          height: Session.get('appHeight') - 280 + 'px'
        }
      },
      browserWindowLocation: ""
    };

    if (get(Meteor, 'settings.public.modules.apps.ZygoteAvatar')) {
      data.browserWindowLocation = "https://zygotebody.com/";
    }

    if(process.env.NODE_ENV === "test") console.log("ZygotePage[data]", data);
    return data;
  }
  render(){
    return(
      <div id="zygotePage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            <CardText>
              <object id="iframe" type="text/html" data={data.browserWindowLocation} style={this.data.style.content}>
                <p>unable to load </p>
              </object>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
ReactMixin(ZygotePage.prototype, ReactMeteorData);