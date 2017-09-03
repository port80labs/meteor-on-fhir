import FHIR from 'fhir';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import { parseString } from 'xml2js';

var fhir = new FHIR(FHIR.DSTU1);

Meteor.methods({
  initializeNutritionOrder:function(){
    console.log('initializeNutritionOrder');

    if (NutritionOrders.find().count() === 0) {
      console.log('-----------------------------------------');
      console.log('No records found in NutritionOrders collection.  Lets create some...');

      var defaultNutritionOrder = {
        'status': 'planned',
        'patient': {
          'display': 'Jane Doe',
          'reference': '123456'
        },
        'oralDiet': {
          'type': [{
            'text': 'Five Guys Hamburger'
          }]
        }
      };
      NutritionOrders.insert(defaultNutritionOrder);
      // Meteor.call('createNutritionOrder', defaultNutritionOrder);
    } else {
      console.log('NutritionOrders already exist.  Skipping.');
    }
  },
  dropTestNutritionOrders: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping test patients... ');
      NutritionOrders.find({test: true}).forEach(function(patient){
        NutritionOrders.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropNutritionOrders: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping test patients... ');
      NutritionOrders.find().forEach(function(patient){
        NutritionOrders.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

  // NEED TO THINK ABOUT THE LEGAL IMPLICATIONS OF THE FOLLOWING 
  // HOW COULD THIS BE ABUSED?

  // syncNutritionOrders: function(){
  //   if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
  //     console.log('-----------------------------------------');
  //     console.log('Syncing patients... ');
  //     var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/NutritionOrder";
  //     console.log(queryString);
      
  //     var result =  HTTP.get(queryString);

  //     var bundle = JSON.parse(result.content);

  //     console.log('result', bundle);
  //     bundle.entry.forEach(function(record){
  //       console.log('record', record);
  //       if(record.resource.resourceType === "NutritionOrder"){
  //         // if(!NutritionOrders.findOne({id:id})){
  //           NutritionOrders.insert(record);
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

