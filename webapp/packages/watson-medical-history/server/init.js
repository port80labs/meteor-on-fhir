


  var medicalHistory = [
    {content: 'In Utero', start: moment('1977-01-01').toDate(), end: moment('1978-01-25').toDate(), type: 'background'},
    {content: 'Car Wreck', group: "Observations", start: moment('1977-08-15').toDate(), type: 'point'},
    {content: 'Ear Infections', group: "Conditions", start: moment('1978-01-25').toDate(), end: moment('1982-04-15').toDate(), type: 'range'},
    {content: 'Tetracycline', group: "Medications", start: moment('1979-09-15').toDate(), type: 'point'},
    {content: 'Delayed Myelinization Diagnosis', group: "Conditions", start: moment('1980-03-15').toDate(), type: 'point'},
    {content: 'Delayed Myelinization', group: "Conditions", start: moment('1977-08-15').toDate(), end: moment('1980-03-15').toDate(), type: 'range'},
    {content: 'Ear Tube Insertion', group: "Procedures", start: moment('1982-04-15').toDate(), type: 'point'},
    {content: 'Accident - Broken Finger', group: "Observations", start: moment('1986-07-01').toDate(), type: 'point'},
    {content: 'Accident - Lip Scar', group: "Observations", start: moment('1989-08-15').toDate(), type: 'point'},
    {content: 'Smoker > 1pk Day', group: "Conditions", start: moment('1996-09-15').toDate(), end: moment('2004-09-15').toDate(), type: 'range'},
    {content: 'Deaf/Hard of Hearing', group: "Conditions", start: moment('1979-01-25').toDate(), end: moment('1982-04-15').toDate(), type: 'range'},
    {content: 'Hyperlexia / Tone Deaf / Read Lips / Sign Language', group: "Conditions", start: moment('1982-04-15').toDate(), end: moment().toDate(), type: 'range'},

    
    {content: 'Speech Therapy', group: "CarePlans", start: moment('1982-04-15').toDate(), end: moment('1992-06-01').toDate(), type: 'range'},
    {content: 'Music Therapy', group: "CarePlans", start: moment('1987-04-15').toDate(), end: moment('1994-06-01').toDate(), type: 'range'},
    {content: 'Speech Therapy - Speech and Debate', group: "CarePlans", start: moment('1992-06-01').toDate(), end: moment('1997-06-01').toDate(), type: 'range'},
    {content: 'Estradiol', group: "Medications", start: moment('2003-01-01').toDate(), end: moment().toDate(), type: 'range'},
    {content: 'Seasonal Bronchitis', group: "Conditions", start: moment('2006-01-01').toDate(), end: moment().toDate(), type: 'range'},
    {content: 'Zyrtec', group: "Medications", start: moment('2010-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2011-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2012-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2013-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2014-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2015-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2016-01-01').toDate(), type: 'point'},
    {content: 'Zyrtec', group: "Medications", start: moment('2017-01-01').toDate(), type: 'point'},
    
    {content: 'Guaifenesin', group: "Medications", start: moment('2010-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2011-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2012-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2013-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2014-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2015-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2016-01-01').toDate(), type: 'point'},
    {content: 'Guaifenesin', group: "Medications", start: moment('2017-01-01').toDate(), type: 'point'},
    
    {content: 'Tonsilectomy', group: "Procedures", start: moment('1998-02-15').toDate(), type: 'point'},
    {content: 'Oxycodone', group: "Medications", start: moment('1998-02-15').toDate(), end: moment('1998-03-15').toDate(), type: 'point'},
    {content: 'MRI Brain w/wo Contrast', group: "Procedures", start: moment('2003-01-02').toDate(), type: 'point'},
    {content: 'MRI Brain w/wo Contrast', group: "Imaging Studies", start: moment('2003-01-02').toDate(), type: 'point'},
    {content: 'ECG', group: "Observations", start: moment('2006-02-01').toDate(), type: 'point'},
    {content: 'Panic Attacks', group: "Conditions", start: moment('2006-01-01').toDate(), end: moment('2008-03-01').toDate(), type: 'range'},
    {content: 'Rohipnol Incident', group: "Observations", start: moment('2007-08-15').toDate(), type: 'point'},
    {content: 'Albuterol', group: "Medications", start: moment('2008-01-22').toDate(), type: 'point'},
    {content: 'Allegra', group: "Medications", start: moment('2010-02-26').toDate(), type: 'point'},
    {content: 'Cold Air Challenge', group: "Procedures", start: moment('2008-01-22').toDate(), type: 'point'},
    {content: 'Meningitis', group: "Conditions", start: moment('2009-09-01').toDate(), end: moment('2009-10-01').toDate(), type: 'point'},
    {content: 'ER Visit', group: "Procedures", start: moment('2009-10-01').toDate(), type: 'point'},
    {content: 'CT Head wo Contrast', group: "Procedures", start: moment('2009-10-08').toDate(), type: 'point'},
    {content: 'CT Head wo Contrast', group: "Imaging Studies", start: moment('2009-10-08').toDate(), type: 'point'},
    {content: 'Rheumatology Consultation', group: "Procedures", start: moment('2009-10-13').toDate(), type: 'point'},
    {content: 'Flonase', group: "Medications", start: moment('2009-10-16').toDate(), type: 'point'},
    {content: 'MRI Brain w/wo Contrast', group: "Procedures", start: moment('2010-09-27').toDate(), type: 'point'},
    {content: 'MRI Brain w/wo Contrast', group: "Imaging Studies", start: moment('2010-09-27').toDate(), type: 'point'},
    {content: 'Intermittent Peripheral Neuropathy', group: "Conditions", start: moment('2009-10-01').toDate(), end: moment().toDate(), type: 'range'},
    {content: 'Multiple Sclerosis', group: "Conditions", start: moment('2009-10-01').toDate(), end: moment().toDate(), type: 'range'},
    
    {content: 'Full Mouth X-Ray', group: "Procedures", start: moment('2016-05-16').toDate(), type: 'point'},
    {content: 'Full Mouth X-Ray', group: "Imaging Studies", start: moment('2016-05-16').toDate(), type: 'point'},
    {content: 'Peridontal Scaling/Planing/Cleaning', group: "Procedures", start: moment('2016-05-15').toDate(), type: 'point'},
    {content: 'Peridontal Scaling/Planing/Cleaning', group: "Procedures", start: moment('2016-06-15').toDate(), type: 'point'},
    {content: 'Peridontal Scaling/Planing/Cleaning', group: "Procedures", start: moment('2016-07-12').toDate(), type: 'point'},
    
    {content: 'Measles (Rubeola)', group: "Immunizations", start: moment('1979-05-11').toDate(), type: 'point'},
    {content: 'Measles (Rubeola)', group: "Immunizations", start: moment('1989-09-11').toDate(), type: 'point'},
    {content: 'German Measles (Rubella)', group: "Immunizations", start: moment('1989-05-11').toDate(), type: 'point'},
    {content: 'Mumps', group: "Immunizations", start: moment('1979-05-11').toDate(), type: 'point'},
    {content: 'Tetnus', group: "Immunizations", start: moment('2016-06-08').toDate(), type: 'point'},
    {content: 'Tetnus/Diphtheria', group: "Immunizations", start: moment('1988-08-11').toDate(), type: 'point'},


    {content: 'Eyesight - P2 -.50 180', group: "Observations", start: moment('2007-03-20').toDate(), type: 'point'},
    {content: '368.9 Visual Disturbances', group: "Conditions", start: moment('2007-03-20').toDate(), type: 'point'},

    {content: 'Proair Inhaler', group: "Medications", start: moment('2009-01-13').toDate(), type: 'point'},

    {content: 'Environmental Allergen Test', group: "Procedures", start: moment('2010-05-28').toDate(), type: 'point'},
    {content: 'Dust Mites', group: "Allergies", start: moment('2010-05-28').toDate(), type: 'point'},


    {content: '2nd Degree Burn', group: "Conditions", start: moment('2017-02-01').toDate(), type: 'point'},
  ];

  var sensitiveItems = [
    {content: 'Gender Dysphoria', group: "Conditions", start: moment('1988-01-01').toDate(), end: moment().toDate(), type: 'range'},      
    {content: 'Suicidal Ideation', group: "Conditions", start: moment('1997-01-01').toDate(), end: moment('2003-01-01').toDate(), type: 'range'},
    {content: 'Psychotherapy', group: "CarePlans", start: moment('1998-09-01').toDate(), end: moment('2000-12-31').toDate(), type: 'range'},
    {content: 'WPATH Standards', group: "CarePlans", start: moment('2003-06-01').toDate(), end: moment().toDate(), type: 'range'},      
    {content: 'Rape Incident', group: "Observations", start: moment('2007-05-15').toDate(), type: 'point'},
    {content: 'Combivir', group: "Medications", start: moment('2007-05-16').toDate(), type: 'point'}
  ];

Meteor.methods({ 
  initializeWatsonContinuityOfCareDoc: function() { 

    if(this.userId){
      // blob everything onto the Meteor.user.profile

      Meteor.users.update({_id: this.userId},{$set: {
        'profile.timeline': medicalHistory
      }});
    }

    // conception date

    // birthdate

    // conditions
    
    // record


    // medication statements

    // medication orders

    // conditions

     
  } 
});