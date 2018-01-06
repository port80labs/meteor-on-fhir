import '/imports/server';
import '/imports/api/users/methods';
import '/imports/api/practitioners/methods';
import '/imports/ui/workflows/patients/methods';

import { get, has } from 'lodash';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import MongoClient from 'mongodb';
import { 
  IdentifierSchema,
  ElementSchema,
  HumanNameSchema,
  ContactPointSchema,
  AddressSchema,
  CodeableConceptSchema,
  AttachmentSchema,
  ReferenceSchema,
  MetaSchema,
  ExtensionSchema,
  BackboneElementSchema,
  NarrativeSchema,
  AnnotationSchema,
  CodingSchema,
  PeriodSchema,
  QuantitySchema,
  DurationSchema,
  DistanceSchema,
  CountSchema,
  MoneySchema,
  AgeSchema,
  RangeSchema,
  RatioSchema,
  SampledDataSchema,
  SignatureSchema,
  TimingSchema,
  ElementDefinitionSchema,
  ContactDetailSchema,
  ContributorSchema,
  DosageSchema,
  RelatedArtifactSchema,
  UsageContextSchema,
  DataRequirementSchema,
  ParameterDefinitionSchema,
  TriggerDefinitionSchema,
  ResourceListSchema,

  AccountSchema,
  ActivityDefinitionSchema,
  AdverseEventSchema,
  AllergyIntoleranceSchema,
  AppointmentSchema,
  AppointmentResponseSchema,
  AuditEventSchema,
  BasicSchema,
  BinarySchema,
  BodySiteSchema,
  BundleSchema,
  CapabilityStatementSchema,
  CarePlanSchema,
  CareTeamSchema,
  ChargeItemSchema,
  ClaimSchema,
  ClaimResponseSchema,
  ClinicalImpressionSchema,
  CodeSystemSchema,
  CommunicationSchema,
  CommunicationRequestSchema,
  CompartmentDefinitionSchema,
  CompositionSchema,
  ConceptMapSchema,
  ConditionSchema,
  ConsentSchema,
  ContractSchema,
  CoverageSchema,
  DataElementSchema,
  DetectedIssueSchema,
  DeviceSchema,
  DeviceComponentSchema,
  DeviceMetricSchema,
  DeviceRequestSchema,
  DeviceUseStatementSchema,
  DiagnosticReportSchema,
  DocumentManifestSchema,
  DocumentReferenceSchema,
  DomainResourceSchema,
  EligibilityRequestSchema,
  EligibilityResponseSchema,
  EncounterSchema,
  EndpointSchema,
  EnrollmentRequestSchema,
  EnrollmentResponseSchema,
  EpisodeOfCareSchema,
  ExpansionProfileSchema,
  ExplanationOfBenefitSchema,
  FamilyMemberHistorySchema,
  FlagSchema,
  GoalSchema,
  GraphDefinitionSchema,
  GroupSchema,
  GuidanceResponseSchema,
  HealthcareServiceSchema,
  ImagingManifestSchema,
  ImagingStudySchema,
  ImmunizationSchema,
  ImmunizationRecommendationSchema,
  ImplementationGuideSchema,
  LibrarySchema,
  LinkageSchema,
  ListSchema,
  LocationSchema,
  MeasureSchema,
  MeasureReportSchema,
  MediaSchema,
  MedicationSchema,
  MedicationAdministrationSchema,
  MedicationDispenseSchema,
  MedicationRequestSchema,
  MedicationStatementSchema,
  MessageDefinitionSchema,
  MessageHeaderSchema,
  NamingSystemSchema,
  NutritionOrderSchema,
  ObservationSchema,
  OperationDefinitionSchema,
  OperationOutcomeSchema,
  OrganizationSchema,
  ParametersSchema,
  PatientSchema,
  PaymentNoticeSchema,
  PaymentReconciliationSchema,
  PersonSchema,
  PlanDefinitionSchema,
  PractitionerSchema,
  PractitionerRoleSchema,
  ProcedureSchema,
  ProcedureRequestSchema,
  ProcessRequestSchema,
  ProcessResponseSchema,
  ProvenanceSchema,
  QuestionnaireSchema,
  QuestionnaireResponseSchema,
  ReferralRequestSchema,
  RelatedPersonSchema,
  RequestGroupSchema,
  ResearchStudySchema,
  ResearchSubjectSchema,
  ResourceSchema,
  RiskAssessmentSchema,
  ScheduleSchema,
  SearchParameterSchema,
  SequenceSchema,
  ServiceDefinitionSchema,
  SlotSchema,
  SpecimenSchema,
  StructureDefinitionSchema,
  StructureMapSchema,
  SubscriptionSchema,
  SubstanceSchema,
  SupplyDeliverySchema,
  SupplyRequestSchema,
  TaskSchema,
  TestReportSchema,
  TestScriptSchema,
  ValueSetSchema,
  VisionPrescriptionSchema,
} from 'fhir-schemas';
import Ajv from 'ajv';

Meteor.startup(function (){
  console.log('Meteor app framework is initializing....');

  // if (Meteor.users.find({username: 'janedoe'}).count() === 0) {
  if (Meteor.users.find({'emails.0.address': 'janedoe@test.org'}).count() === 0) {
    let newAccount = Accounts.createUser({
      username: 'janedoe',
      email: 'janedoe@test.org',
      password: 'janedoe',
      profile: {
        name: {
          given: 'Jane',
          family: 'Doe',
          text: 'Jane Doe'
        }
      }
    });
    console.log('Initialized Jane Doe account.  ', newAccount);
  } else {
    console.log('Jane Doe account already exists.  Skipping.');
  }

  console.log('Meteor.settings', Meteor.settings);


  console.log('//-------------------------------------------------');
  console.log('Creating CurrentPatients...')

  console.log('PatientSchema', PatientSchema);

  delete IdentifierSchema.$schema;
  delete ElementSchema.$schema;
  delete HumanNameSchema.$schema;
  delete ContactPointSchema.$schema;
  delete AddressSchema.$schema;
  delete CodeableConceptSchema.$schema;
  delete AttachmentSchema.$schema;
  delete ReferenceSchema.$schema;
  delete MetaSchema.$schema;
  delete ExtensionSchema.$schema;
  delete BackboneElementSchema.$schema;
  delete NarrativeSchema.$schema;
  delete AnnotationSchema.$schema;
  delete CodingSchema.$schema;
  delete PeriodSchema.$schema;
  delete QuantitySchema.$schema;  
  delete DurationSchema.$schema;  
  delete DistanceSchema.$schema;    
  delete CountSchema.$schema;    
  delete MoneySchema.$schema;  
  delete AgeSchema.$schema;  
  delete RangeSchema.$schema;  
  delete RatioSchema.$schema;  
  delete SampledDataSchema.$schema;  
  delete SignatureSchema.$schema;  
  delete TimingSchema.$schema;  
  delete ElementDefinitionSchema.$schema;  
  delete ContactDetailSchema.$schema;  
  delete ContributorSchema.$schema;  
  delete DosageSchema.$schema;  
  delete RelatedArtifactSchema.$schema;  
  delete UsageContextSchema.$schema;
  delete DataRequirementSchema.$schema;
  delete ParameterDefinitionSchema.$schema;
  delete TriggerDefinitionSchema.$schema;
  delete ResourceListSchema.$schema;

  delete AccountSchema.$schema;
  delete ActivityDefinitionSchema.$schema;
  delete AdverseEventSchema.$schema;
  delete AllergyIntoleranceSchema.$schema;
  delete AppointmentSchema.$schema;
  delete AppointmentResponseSchema.$schema;
  delete AuditEventSchema.$schema;
  delete BasicSchema.$schema;
  delete BinarySchema.$schema;
  delete BodySiteSchema.$schema;
  delete BundleSchema.$schema;
  delete CapabilityStatementSchema.$schema;
  delete CarePlanSchema.$schema;
  delete CareTeamSchema.$schema;
  delete ChargeItemSchema.$schema;
  delete ClaimSchema.$schema;
  delete ClaimResponseSchema.$schema;
  delete ClinicalImpressionSchema.$schema;
  delete CodeSystemSchema.$schema;
  delete CommunicationSchema.$schema;
  delete CommunicationRequestSchema.$schema;
  delete CompartmentDefinitionSchema.$schema;
  delete CompositionSchema.$schema;
  delete ConceptMapSchema.$schema;
  delete ConditionSchema.$schema;
  delete ConsentSchema.$schema;
  delete ContractSchema.$schema;
  delete CoverageSchema.$schema;
  delete DataElementSchema.$schema;
  delete DetectedIssueSchema.$schema;
  delete DeviceSchema.$schema;
  delete DeviceComponentSchema.$schema;
  delete DeviceMetricSchema.$schema;
  delete DeviceRequestSchema.$schema;
  delete DeviceUseStatementSchema.$schema;
  delete DiagnosticReportSchema.$schema;
  delete DocumentManifestSchema.$schema;
  delete DocumentReferenceSchema.$schema;
  delete DomainResourceSchema.$schema;
  delete EligibilityRequestSchema.$schema;
  delete EligibilityResponseSchema.$schema;
  delete EncounterSchema.$schema;
  delete EndpointSchema.$schema;
  delete EnrollmentRequestSchema.$schema;
  delete EnrollmentResponseSchema.$schema;
  delete EpisodeOfCareSchema.$schema;
  delete ExpansionProfileSchema.$schema;
  delete ExplanationOfBenefitSchema.$schema;
  delete FamilyMemberHistorySchema.$schema;
  delete FlagSchema.$schema;
  delete GoalSchema.$schema;
  delete GraphDefinitionSchema.$schema;
  delete GroupSchema.$schema;
  delete GuidanceResponseSchema.$schema;
  delete HealthcareServiceSchema.$schema;
  delete ImagingManifestSchema.$schema;
  delete ImagingStudySchema.$schema;
  delete ImmunizationSchema.$schema;
  delete ImmunizationRecommendationSchema.$schema;
  delete ImplementationGuideSchema.$schema;
  delete LibrarySchema.$schema;
  delete LinkageSchema.$schema;
  delete ListSchema.$schema;
  delete LocationSchema.$schema;
  delete MeasureSchema.$schema;
  delete MeasureReportSchema.$schema;
  delete MediaSchema.$schema;
  delete MedicationSchema.$schema;
  delete MedicationAdministrationSchema.$schema;
  delete MedicationDispenseSchema.$schema;
  delete MedicationRequestSchema.$schema;
  delete MedicationStatementSchema.$schema;
  delete MessageDefinitionSchema.$schema;
  delete MessageHeaderSchema.$schema;
  delete NamingSystemSchema.$schema;
  delete NutritionOrderSchema.$schema;
  delete ObservationSchema.$schema;
  delete OperationDefinitionSchema.$schema;
  delete OperationOutcomeSchema.$schema;
  delete OrganizationSchema.$schema;
  delete ParametersSchema.$schema;
  delete PatientSchema.$schema;
  delete PaymentNoticeSchema.$schema;
  delete PaymentReconciliationSchema.$schema;
  delete PersonSchema.$schema;
  delete PlanDefinitionSchema.$schema;
  delete PractitionerSchema.$schema;
  delete PractitionerRoleSchema.$schema;
  delete ProcedureSchema.$schema;
  delete ProcedureRequestSchema.$schema;
  delete ProcessRequestSchema.$schema;
  delete ProcessResponseSchema.$schema;
  delete ProvenanceSchema.$schema;
  delete QuestionnaireSchema.$schema;
  delete QuestionnaireResponseSchema.$schema;
  delete ReferralRequestSchema.$schema;
  delete RelatedPersonSchema.$schema;
  delete RequestGroupSchema.$schema;
  delete ResearchStudySchema.$schema;
  delete ResearchSubjectSchema.$schema;
  delete ResourceSchema.$schema;
  delete RiskAssessmentSchema.$schema;
  delete ScheduleSchema.$schema;
  delete SearchParameterSchema.$schema;
  delete SequenceSchema.$schema;
  delete ServiceDefinitionSchema.$schema;
  delete SlotSchema.$schema;
  delete SpecimenSchema.$schema;
  delete StructureDefinitionSchema.$schema;
  delete StructureMapSchema.$schema;
  delete SubscriptionSchema.$schema;
  delete SubstanceSchema.$schema;
  delete SupplyDeliverySchema.$schema;
  delete SupplyRequestSchema.$schema;
  delete TaskSchema.$schema;
  delete TestReportSchema.$schema;
  delete TestScriptSchema.$schema;
  delete ValueSetSchema.$schema;
  delete VisionPrescriptionSchema.$schema;


  IdentifierSchema.$id = IdentifierSchema.id;
  ElementSchema.$id = ElementSchema.id;
  HumanNameSchema.$id = HumanNameSchema.id;
  ContactPointSchema.$id = ContactPointSchema.id;
  AddressSchema.$id = AddressSchema.id;
  CodeableConceptSchema.$id = CodeableConceptSchema.id;
  AttachmentSchema.$id = AttachmentSchema.id;
  ReferenceSchema.$id = ReferenceSchema.id;
  MetaSchema.$id = MetaSchema.id;
  ExtensionSchema.$id = ExtensionSchema.id;
  BackboneElementSchema.$id = BackboneElementSchema.id;
  NarrativeSchema.$id = NarrativeSchema.id;
  AnnotationSchema.$id = AnnotationSchema.id;
  CodingSchema.$id = CodingSchema.id;
  PeriodSchema.$id = PeriodSchema.id;
  QuantitySchema.$id = QuantitySchema.id;
  DurationSchema.$id = DurationSchema.id;
  DistanceSchema.$id = DistanceSchema.id;
  CountSchema.$id = CountSchema.id;
  MoneySchema.$id = MoneySchema.id;
  AgeSchema.$id = AgeSchema.id;
  RangeSchema.$id = RangeSchema.id;
  RatioSchema.$id = RatioSchema.id;
  SampledDataSchema.$id = SampledDataSchema.id;
  SignatureSchema.$id = SignatureSchema.id;
  TimingSchema.$id = TimingSchema.id;
  ElementDefinitionSchema.$id = ElementDefinitionSchema.id;
  ContactDetailSchema.$id = ContactDetailSchema.id;
  ContributorSchema.$id = ContributorSchema.id;
  DosageSchema.$id = DosageSchema.id;
  RelatedArtifactSchema.$id = RelatedArtifactSchema.id;
  UsageContextSchema.$id = UsageContextSchema.id;
  DataRequirementSchema.$id = DataRequirementSchema.id;
  ParameterDefinitionSchema.$id = ParameterDefinitionSchema.id;
  TriggerDefinitionSchema.$id = TriggerDefinitionSchema.id;
  ResourceListSchema.$id = ResourceListSchema.id;

  AccountSchema.$id = AccountSchema.id; 
  ActivityDefinitionSchema.$id = ActivityDefinitionSchema.id; 
  AdverseEventSchema.$id = AdverseEventSchema.id; 
  AllergyIntoleranceSchema.$id = AllergyIntoleranceSchema.id; 
  AppointmentSchema.$id = AppointmentSchema.id; 
  AppointmentResponseSchema.$id = AppointmentResponseSchema.id; 
  AuditEventSchema.$id = AuditEventSchema.id; 
  BasicSchema.$id = BasicSchema.id; 
  BinarySchema.$id = BinarySchema.id; 
  BodySiteSchema.$id = BodySiteSchema.id; 
  BundleSchema.$id = BundleSchema.id; 
  CapabilityStatementSchema.$id = CapabilityStatementSchema.id; 
  CarePlanSchema.$id = CarePlanSchema.id; 
  CareTeamSchema.$id = CareTeamSchema.id; 
  ChargeItemSchema.$id = ChargeItemSchema.id; 
  ClaimSchema.$id = ClaimSchema.id; 
  ClaimResponseSchema.$id = ClaimResponseSchema.id; 
  ClinicalImpressionSchema.$id = ClinicalImpressionSchema.id; 
  CodeSystemSchema.$id = CodeSystemSchema.id; 
  CommunicationSchema.$id = CommunicationSchema.id; 
  CommunicationRequestSchema.$id = CommunicationRequestSchema.id; 
  CompartmentDefinitionSchema.$id = CompartmentDefinitionSchema.id; 
  CompositionSchema.$id = CompositionSchema.id; 
  ConceptMapSchema.$id = ConceptMapSchema.id; 
  ConditionSchema.$id = ConditionSchema.id; 
  ConsentSchema.$id = ConsentSchema.id; 
  ContractSchema.$id = ContractSchema.id; 
  CoverageSchema.$id = CoverageSchema.id; 
  DataElementSchema.$id = DataElementSchema.id; 
  DetectedIssueSchema.$id = DetectedIssueSchema.id; 
  DeviceSchema.$id = DeviceSchema.id; 
  DeviceComponentSchema.$id = DeviceComponentSchema.id; 
  DeviceMetricSchema.$id = DeviceMetricSchema.id; 
  DeviceRequestSchema.$id = DeviceRequestSchema.id; 
  DeviceUseStatementSchema.$id = DeviceUseStatementSchema.id; 
  DiagnosticReportSchema.$id = DiagnosticReportSchema.id; 
  DocumentManifestSchema.$id = DocumentManifestSchema.id; 
  DocumentReferenceSchema.$id = DocumentReferenceSchema.id; 
  DomainResourceSchema.$id = DomainResourceSchema.id; 
  EligibilityRequestSchema.$id = EligibilityRequestSchema.id; 
  EligibilityResponseSchema.$id = EligibilityResponseSchema.id; 
  EncounterSchema.$id = EncounterSchema.id; 
  EndpointSchema.$id = EndpointSchema.id; 
  EnrollmentRequestSchema.$id = EnrollmentRequestSchema.id; 
  EnrollmentResponseSchema.$id = EnrollmentResponseSchema.id; 
  EpisodeOfCareSchema.$id = EpisodeOfCareSchema.id; 
  ExpansionProfileSchema.$id = ExpansionProfileSchema.id; 
  ExplanationOfBenefitSchema.$id = ExplanationOfBenefitSchema.id; 
  FamilyMemberHistorySchema.$id = FamilyMemberHistorySchema.id; 
  FlagSchema.$id = FlagSchema.id; 
  GoalSchema.$id = GoalSchema.id; 
  GraphDefinitionSchema.$id = GraphDefinitionSchema.id; 
  GroupSchema.$id = GroupSchema.id; 
  GuidanceResponseSchema.$id = GuidanceResponseSchema.id; 
  HealthcareServiceSchema.$id = HealthcareServiceSchema.id; 
  ImagingManifestSchema.$id = ImagingManifestSchema.id; 
  ImagingStudySchema.$id = ImagingStudySchema.id; 
  ImmunizationSchema.$id = ImmunizationSchema.id; 
  ImmunizationRecommendationSchema.$id = ImmunizationRecommendationSchema.id; 
  ImplementationGuideSchema.$id = ImplementationGuideSchema.id; 
  LibrarySchema.$id = LibrarySchema.id; 
  LinkageSchema.$id = LinkageSchema.id; 
  ListSchema.$id = ListSchema.id; 
  LocationSchema.$id = LocationSchema.id; 
  MeasureSchema.$id = MeasureSchema.id; 
  MeasureReportSchema.$id = MeasureReportSchema.id; 
  MediaSchema.$id = MediaSchema.id; 
  MedicationSchema.$id = MedicationSchema.id; 
  MedicationAdministrationSchema.$id = MedicationAdministrationSchema.id; 
  MedicationDispenseSchema.$id = MedicationDispenseSchema.id; 
  MedicationRequestSchema.$id = MedicationRequestSchema.id; 
  MedicationStatementSchema.$id = MedicationStatementSchema.id; 
  MessageDefinitionSchema.$id = MessageDefinitionSchema.id; 
  MessageHeaderSchema.$id = MessageHeaderSchema.id; 
  NamingSystemSchema.$id = NamingSystemSchema.id; 
  NutritionOrderSchema.$id = NutritionOrderSchema.id; 
  ObservationSchema.$id = ObservationSchema.id; 
  OperationDefinitionSchema.$id = OperationDefinitionSchema.id; 
  OperationOutcomeSchema.$id = OperationOutcomeSchema.id; 
  OrganizationSchema.$id = OrganizationSchema.id; 
  ParametersSchema.$id = ParametersSchema.id; 
  PatientSchema.$id = PatientSchema.id; 
  PaymentNoticeSchema.$id = PaymentNoticeSchema.id; 
  PaymentReconciliationSchema.$id = PaymentReconciliationSchema.id; 
  PersonSchema.$id = PersonSchema.id; 
  PlanDefinitionSchema.$id = PlanDefinitionSchema.id; 
  PractitionerSchema.$id = PractitionerSchema.id; 
  PractitionerRoleSchema.$id = PractitionerRoleSchema.id; 
  ProcedureSchema.$id = ProcedureSchema.id; 
  ProcedureRequestSchema.$id = ProcedureRequestSchema.id; 
  ProcessRequestSchema.$id = ProcessRequestSchema.id; 
  ProcessResponseSchema.$id = ProcessResponseSchema.id; 
  ProvenanceSchema.$id = ProvenanceSchema.id; 
  QuestionnaireSchema.$id = QuestionnaireSchema.id; 
  QuestionnaireResponseSchema.$id = QuestionnaireResponseSchema.id; 
  ReferralRequestSchema.$id = ReferralRequestSchema.id; 
  RelatedPersonSchema.$id = RelatedPersonSchema.id; 
  RequestGroupSchema.$id = RequestGroupSchema.id; 
  ResearchStudySchema.$id = ResearchStudySchema.id; 
  ResearchSubjectSchema.$id = ResearchSubjectSchema.id; 
  ResourceSchema.$id = ResourceSchema.id; 
  RiskAssessmentSchema.$id = RiskAssessmentSchema.id; 
  ScheduleSchema.$id = ScheduleSchema.id; 
  SearchParameterSchema.$id = SearchParameterSchema.id; 
  SequenceSchema.$id = SequenceSchema.id; 
  ServiceDefinitionSchema.$id = ServiceDefinitionSchema.id; 
  SlotSchema.$id = SlotSchema.id; 
  SpecimenSchema.$id = SpecimenSchema.id; 
  StructureDefinitionSchema.$id = StructureDefinitionSchema.id; 
  StructureMapSchema.$id = StructureMapSchema.id; 
  SubscriptionSchema.$id = SubscriptionSchema.id; 
  SubstanceSchema.$id = SubstanceSchema.id; 
  SupplyDeliverySchema.$id = SupplyDeliverySchema.id; 
  SupplyRequestSchema.$id = SupplyRequestSchema.id; 
  TaskSchema.$id = TaskSchema.id; 
  TestReportSchema.$id = TestReportSchema.id; 
  TestScriptSchema.$id = TestScriptSchema.id; 
  ValueSetSchema.$id = ValueSetSchema.id; 
  VisionPrescriptionSchema.$id = VisionPrescriptionSchema.id; 

  
  // Connection URL
  const url = 'mongodb://localhost:3001';
  
  // Database Name
  const dbName = 'meteor';
  
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) { 
      const db = client.db(dbName);
  
      db.createCollection("CurrentPatients", {
          validator: {
              $jsonSchema: PatientSchema
          }
      });

      var ajv = new Ajv({schemas: [         
        IdentifierSchema,
        ElementSchema,
        HumanNameSchema,
        ContactPointSchema,
        AddressSchema,
        CodeableConceptSchema,
        AttachmentSchema,
        ReferenceSchema,
        MetaSchema,
        ExtensionSchema,
        BackboneElementSchema,
        NarrativeSchema,
        AnnotationSchema,
        CodingSchema,
        PeriodSchema,
        QuantitySchema,
        DurationSchema,
        DistanceSchema,
        CountSchema,
        MoneySchema,
        AgeSchema,
        RangeSchema,
        RatioSchema,
        SampledDataSchema,
        SignatureSchema,
        TimingSchema,
        ElementDefinitionSchema,
        ContactDetailSchema,
        ContributorSchema,
        DosageSchema,
        RelatedArtifactSchema,
        UsageContextSchema,
        DataRequirementSchema,
        ParameterDefinitionSchema,
        TriggerDefinitionSchema,
        ResourceListSchema,

        AccountSchema,
        ActivityDefinitionSchema,
        AdverseEventSchema,
        AllergyIntoleranceSchema,
        AppointmentSchema,
        AppointmentResponseSchema,
        AuditEventSchema,
        BasicSchema,
        BinarySchema,
        BodySiteSchema,
        BundleSchema,
        CapabilityStatementSchema,
        CarePlanSchema,
        CareTeamSchema,
        ChargeItemSchema,
        ClaimSchema,
        ClaimResponseSchema,
        ClinicalImpressionSchema,
        CodeSystemSchema,
        CommunicationSchema,
        CommunicationRequestSchema,
        CompartmentDefinitionSchema,
        CompositionSchema,
        ConceptMapSchema,
        ConditionSchema,
        ConsentSchema,
        ContractSchema,
        CoverageSchema,
        DataElementSchema,
        DetectedIssueSchema,
        DeviceSchema,
        DeviceComponentSchema,
        DeviceMetricSchema,
        DeviceRequestSchema,
        DeviceUseStatementSchema,
        DiagnosticReportSchema,
        DocumentManifestSchema,
        DocumentReferenceSchema,
        DomainResourceSchema,
        EligibilityRequestSchema,
        EligibilityResponseSchema,
        EncounterSchema,
        EndpointSchema,
        EnrollmentRequestSchema,
        EnrollmentResponseSchema,
        EpisodeOfCareSchema,
        ExpansionProfileSchema,
        ExplanationOfBenefitSchema,
        FamilyMemberHistorySchema,
        FlagSchema,
        GoalSchema,
        GraphDefinitionSchema,
        GroupSchema,
        GuidanceResponseSchema,
        HealthcareServiceSchema,
        ImagingManifestSchema,
        ImagingStudySchema,
        ImmunizationSchema,
        ImmunizationRecommendationSchema,
        ImplementationGuideSchema,
        LibrarySchema,
        LinkageSchema,
        ListSchema,
        LocationSchema,
        MeasureSchema,
        MeasureReportSchema,
        MediaSchema,
        MedicationSchema,
        MedicationAdministrationSchema,
        MedicationDispenseSchema,
        MedicationRequestSchema,
        MedicationStatementSchema,
        MessageDefinitionSchema,
        MessageHeaderSchema,
        NamingSystemSchema,
        NutritionOrderSchema,
        ObservationSchema,
        OperationDefinitionSchema,
        OperationOutcomeSchema,
        OrganizationSchema,
        ParametersSchema,
        PatientSchema,
        PaymentNoticeSchema,
        PaymentReconciliationSchema,
        PersonSchema,
        PlanDefinitionSchema,
        PractitionerSchema,
        PractitionerRoleSchema,
        ProcedureSchema,
        ProcedureRequestSchema,
        ProcessRequestSchema,
        ProcessResponseSchema,
        ProvenanceSchema,
        QuestionnaireSchema,
        QuestionnaireResponseSchema,
        ReferralRequestSchema,
        RelatedPersonSchema,
        RequestGroupSchema,
        ResearchStudySchema,
        ResearchSubjectSchema,
        ResourceSchema,
        RiskAssessmentSchema,
        ScheduleSchema,
        SearchParameterSchema,
        SequenceSchema,
        ServiceDefinitionSchema,
        SlotSchema,
        SpecimenSchema,
        StructureDefinitionSchema,
        StructureMapSchema,
        SubscriptionSchema,
        SubstanceSchema,
        SupplyDeliverySchema,
        SupplyRequestSchema,
        TaskSchema,
        TestReportSchema,
        TestScriptSchema,
        ValueSetSchema,
        VisionPrescriptionSchema,
      ]});

      var validate = ajv.getSchema('http://hl7.org/fhir/json-schema/Patient');

      var newPatient = {
        "resourceType": "Patient",
        "name": [{
          "family": 'Doe',
          "given": ['Jane']
      }],
        "identifier": [{
            "value": '123'
        }]
      };

      var isValid = validate(newPatient);
      if(isValid){
        // Insert some documents
        db.collection('CurrentPatients').insertMany([
          newPatient
        ], function(err, result) {
          console.log("Inserted newPatient into the CurrentPatients collection");
        });
      } else {
        console.log("newPatient isn't valid...");
        console.log(validate.errors);
      }

    client.close();
  });


});



if(!has(Meteor, 'settings.private')) {
  Meteor.settings = JSON.parse(Assets.getText('settings.default.json'));
}

