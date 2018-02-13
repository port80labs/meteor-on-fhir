import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import PractitionerDetail  from '/imports/ui/workflows/practitioners/PractitionerDetail';
import PractitionersTable  from '/imports/ui/workflows/practitioners/PractitionersTable';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

Session.setDefault('practitionerPageTabIndex', 1);
Session.setDefault('practitionerSearchFilter', '');
Session.setDefault('selectedPractitioner', false);

export class PractitionersPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('practitionerPageTabIndex'),
      practitionerSearchFilter: Session.get('practitionerSearchFilter'),
      currentPractitioner: Session.get('selectedPractitioner')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("PractitionersPage[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    Session.set('practitionerPageTabIndex', index);
  }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab; we should clear things...");

    Session.set('selectedPractitioner', false);
    Session.set('practitionerUpsert', false);
  }

  render() {
    return (
      <div id="practitionersPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title="Practitioners"
            />
            <CardText>
              <Tabs id="practitionersPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1} style={{borderRight: 'none'}} >
                <Tab className="newPractitionerTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <PractitionerDetail id='newPractitioner' />
                </Tab>
                <Tab className="practitionerListTab" label='Practitioners' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <PractitionersTable showBarcodes={false} />
                 </Tab>
                 <Tab className="practitionerDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <PractitionerDetail id='practitionerDetails' />
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(PractitionersPage.prototype, ReactMeteorData);
