import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedOrganizations', []);

export default class OrganizationTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        }
      },
      selected: [],
      organizations: Organizations.find().map(function(organization){
        let result = {
          _id: '',
          name: '',
          identifier: [],
          phone: '',
          email: ''
        };

        if (organization._id ) {
          result._id = organization._id;
        }
        if (organization.name ) {
          result.name = organization.name ;
        }
        if (organization.identifier && organization.identifier[0] && organization.identifier[0].value ) {
          result.identifier = organization.identifier;
        }
        if (organization.telecom && organization.telecom[0] && organization.telecom[0].value ) {
          result.phone = organization.telecom[0].value ;
        }
        if (organization.telecom && organization.telecom[1] && organization.telecom[1].value ) {
          result.email = organization.telecom[1].value;
        }

        return result;
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    //console.log("data", data);
    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }

  rowClick(id){
    Session.set('organizationUpsert', false);
    Session.set('selectedOrganization', id);
    Session.set('organizationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.organizations.length; i++) {
      tableRows.push(
      <tr className='organizationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.organizations[i]._id) }>
        <td className="name hidden-on-phone">{this.data.organizations[i].name}</td>
        <td className="identifier hidden-on-phone">{ ( this.data.organizations[i].identifier && this.data.organizations[i].identifier[0]) ? this.data.organizations[i].identifier[0].value : '' }</td>
        <td className="phone">{this.data.organizations[i].phone}</td>
        <td className="email">{this.data.organizations[i].email}</td>
      </tr>);
    }


    return(
      <Table id="organizationsTable" ref='organizationsTable' responses hover >
        <thead>
          <tr>
            <th className="name hidden-on-phone">name</th>
            <th className="identifier hidden-on-phone">identifier</th>
            <th className="phone">phone</th>
            <th className="email">email</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(OrganizationTable.prototype, ReactMeteorData);
