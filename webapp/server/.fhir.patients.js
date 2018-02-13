if(Package['clinical:hl7-resource-patient']){

  import { HTTP } from 'meteor/http';
  import { Meteor } from 'meteor/meteor';
  import { Promise } from 'meteor/promise';
  import { parseString } from 'xml2js';
  
  if(process.env.FhirEnabled){
    import FHIR from 'fhir';  
  }
  
  
  Meteor.methods({
     queryEpic: async function(resourceType){
      console.log('-----------------------------------------');
      console.log('Querying open.epic.com...', resourceType);
  
      if(process.env.FhirEnabled){
        if(resourceType === "Patient"){
          var httpResult = HTTP.get('https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/Patient/Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB');
  
          const patientJson = Promise.await(fhir.XmlToObject(httpResult.content));
  
            console.log('parseEpicXml[result]', patientJson)
            var patientStu3 = Patients.toStu3(patientJson);
  
            PatientSchema.clean(patientStu3);
  
            console.log('savePatient', patientStu3);
                
            if(patientStu3.resourceType === "Patient"){
              Patients.insert(patientStu3, function(error, result){
                if (error) {
                  console.log('Patients.insert[error]', error);
                  HipaaLogger.logEvent({eventType: "error", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
                }
                if (result) {
                  console.log('Patient created: ' + result);
                  HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
                }
              });        
  
            } else {
              console.log('Not a patient...')
            }
        } 
      }
     },
    createPatient:function(patientObject){
      check(patientObject, Object);
  
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Creating Patient...');
        Patients.insert(patientObject, function(error, result){
          if (error) {
            console.log(error);
            HipaaLogger.logEvent({eventType: "error", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
          }
          if (result) {
            console.log('Patient created: ' + result);
            HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
          }
        });
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    initializePatient:function(){
      if (Patients.find().count() === 0) {
        console.log('-----------------------------------------');
        console.log('No records found in Patients collection.  Lets create some...');
  
        var defaultPatient = {
          'name' : [
            {
              'text' : 'Jane Doe',
              'resourceType' : 'HumanName'
            }
          ],
          'active' : true,
          'gender' : 'female',
          'identifier' : [
            {
              'use' : 'usual',
              'type' : {
                text: 'Medical record number',
                'coding' : [
                  {
                    'system' : 'http://hl7.org/fhir/v2/0203',
                    'code' : 'MR'
                  }
                ]
              },
              'system' : 'urn:oid:1.2.36.146.595.217.0.1',
              'value' : '123',
              'period' : {}
            }
          ],
          'birthdate' : new Date(1970, 1, 25),
          'resourceType' : 'Patient'
        };
  
        Meteor.call('createPatient', defaultPatient);
      } else {
        console.log('Patients already exist.  Skipping.');
      }
    },
    dropTestPatients: function(){
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Dropping test patients... ');
        Patients.find({test: true}).forEach(function(patient){
          Patients.remove({_id: patient._id});
        });
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    dropPatients: function(){
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Dropping test patients... ');
        Patients.find().forEach(function(patient){
          Patients.remove({_id: patient._id});
        });
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    }
  
    // NEED TO THINK ABOUT THE LEGAL IMPLICATIONS OF THE FOLLOWING 
    // HOW COULD THIS BE ABUSED?
  
    // syncPatients: function(){
    //   if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
    //     console.log('-----------------------------------------');
    //     console.log('Syncing patients... ');
    //     var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/Patient";
    //     console.log(queryString);
        
    //     var result =  HTTP.get(queryString);
  
    //     var bundle = JSON.parse(result.content);
  
    //     console.log('result', bundle);
    //     bundle.entry.forEach(function(record){
    //       console.log('record', record);
    //       if(record.resource.resourceType === "Patient"){
    //         // if(!Patients.findOne({id:id})){
    //           Patients.insert(record);
    //         // }
    //       }
    //     });
    //     Meteor.call('generateDailyStat');
    //     var stats = DailyStats.generate();
    //     Statistics.insert(stats);
    //     return stats;
    //   }else {
    //   console.log('-----------------------------------------');
    //   console.log('Syncing disabled... ');      
    //   }
  
    // }  
  });
  
  
}


