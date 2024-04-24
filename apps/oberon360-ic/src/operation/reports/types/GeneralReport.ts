import { ValidationWithComments } from './GenericControls';

export type GeneralReport = {
  personalData: PersonalData;
  backgroundCheck: BackgroundCheck;
  //otherBackgroundCheck: OtherBackgroundCheck[];
  familyInformation: FamilyInformation;
  secondaryFamilyInformation: SecondaryFamilyInformation;
  /*cohabitantsInformation: {
    cohabitants: CohabitantsInformation[];
    observations: string;
  };
  */
  //classificationAndTypeOfHousing: ClassificationAndTypeOfHousing;
  //workExperience: WorkExperience;
  //personalReferenceCheck: PersonalReferenceCheck;
  //photographicRecord: PhotographicRecord;
  //finalConcept: FinalConcept;
};

export type PersonalData = {
  firstLastName: string;
  middleLastName: string;
  names: string;
  birthDate: string;
  birthDepartment: string;
  birthTown: string;
  RH: string;
  height: string;
  identificationNumber: string;
  documentIssueDate: string;
  documentIssuePlace: string;
  typeOfPassbook: string;
  militaryDistrict: string;
  militaryPassbookNumber: string;
  particularSigns: string;
  residenceAddress: string;
  cityResidence: string;
  district: string;
  phone: string;
  cellPhone: string;
  maritalStatus: string;
  childrenNumber: string;
  //educationalLevel: string;
  //numberOfPersonsPresentAtTheVisit: string;
};

export type BackgroundCheck = {
  generalComptrolleroftheNation: string;
  generalComptrolleroftheNationRemarks: string;
  judicialRecords: string;
  judicialRecordsRemarks: string;
  restrictivelistrecords: string;
  restrictivelistrecordsRemarks: string;
  nationalPolicerecordsDIJIN: string;
  nationalPolicerecordsDIJINRemarks: string;
  nationalAttorneyGeneralsOffice: string;
  nationalAttorneyGeneralsOfficeRemarks: string;
  nationalRegistryofCivilStatus: string;
  nationalRegistryofCivilStatusRemarks: string;
  RUNTTrafficInformation: string;
  RUNTTrafficInformationRemarks: string;
  SIMITTrafficInformation: string;
  SIMITTrafficInformationRemarks: string;
  ConsultationOfLAFTLists: string;
  ConsultationOfLAFTListsRemarks: string;
  OFACListConsultation: string;
  OFACListConsultationRemarks: string;
  NationalRegistrySystemofCorrectiveMeasuresRNMC: string;
  NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks: string;
  MilitarySituation: string;
  MilitarySituationRemarks: string;
  Adverse: string;
  AdverseRemarks: string;
  SARLAFVerification: string;
  SARLAFVerificationRemarks: string;
};

export type FamilyInformationSiblings = {
  fullNames: string;
  age?: string;
  address: string;
  livingStatus?: boolean;
  livesWith?: boolean;
  landlinePhone?: string;
  mobile: string;
  profession: string;
};

export type FamilyInformation = {
  mothersName: string;
  mothersAge: string;
  addressMother: string;
  mothersLivingStatus: string;
  motherLivesWith: string;
  mothersLandline: string;
  mothersMobilePhone: string;
  professionMother: string;
  fathersName: string;
  fathersAge: string;
  addressFather: string;
  livingStatusFather: string;
  fatherLivesWith: string;
  fathersLandline: string;
  fathersMobilePhone: string;
  professionFather: string;
  familyInformationSiblings?: FamilyInformationSiblings[];
};

type SecondaryFamilyInformationChildren = {
  name: string;
  documentNumber: string;
  dateOfBirth: string;
  department: string;
  municipality: string;
  livesWith: string;
  age: string;
  landlinePhone: string;
  mobile: string;
  occupation: string;
};

type CohabitantsInformation = {
  fullName: string;
  age: string;
  phone: string;
  profession: string;
  relationship: string;
};

export type SecondaryFamilyInformation = {
  fullName: string;
  identificationNumber: string;
  birthDate: string;
  birthDepartment: string;
  birthTown: string;
  yearsOfAcquaintances: string;
  age: string;
  phoneNumber: string;
  cellPhoneNumber: string;
  profession: string;
  informationChildren?: SecondaryFamilyInformationChildren[];
  cohabitantsInformation?: CohabitantsInformation[];
};

type NeighbourhoodInformation = {
  names: string;
  address: string;
  phone: string;
  relationship: string;
};

type HistoricalHousing = {
  typeOfDwelling: string;
  typePlace: string;
  from: string;
  to: string;
  nameOfOwner: string;
  telephone: string;
};

type ClassificationAndTypeOfHousing = {
  typeOfDwelling: string;
  locationArea: string;
  typeOfPlace: string;
  from: string;
  nameOfOwner: string;
  telephone: string;
  historicalHousing: HistoricalHousing[];
  stateOfTheDwelling: string;
  occupation: string;
  externalPresentation: string;
  internalPresentation: string;
  numberOfFamiliesIntheDwelling: string;
  totalNumberOfPersonsinTheDwelling: string;
  descriptionOfTheDwelling: string;
  stratum: string;
  surroundingsOfTheSector: string;
  accessRoads: string;
  vulnerabilityOfTheSector: string;
  because: string;
  publicUtilitiesAndDomesticServices: string;
  neighbourhoodInformation: NeighbourhoodInformation[];
};

type VerificationOfEmploymentReferences = {
  nameOfTheCompany: string;
  phoneNumbers: string;
  informationProvidedBy: string;
  position: string;
  sourceOfEnquiry: string;
  dateOfEntry: string;
  dateOfWithdrawal: string;
  reasonForRetirement: string;
  positionOfTheEvaluated: string;
  observations: string;
};

type EmployerInformation = {
  nameOfImmediateSuperior: string;
  position: string;
  telephone: string;
  performanceEvaluation: string;
};

type WorkExperienceInformation = {
  verificationOfEmploymentReferences: VerificationOfEmploymentReferences;
  employerInformation: EmployerInformation;
};

type PeriodOfInactivityAtWork = {
  from: string;
  to: string;
  occupation: string;
};

type WorkExperience = {
  workExperienceInformation: WorkExperienceInformation[];
  periodOfInactivityAtWork: PeriodOfInactivityAtWork[];
};

type AcademicInformation = {
  nameOfEducationalSstablishment: string;
  phoneNumbers: string;
  city: string;
  levelOfSchooling: string;
  degreeObtained: string;
  folioAndRegistration: string;
  year: string;
  informationProvidedBy: string;
  position: string;
  sourceOfEnquiry: string;
  remarks: string;
};

type VerificationOfAcademicInformation = {
  academicInformation: AcademicInformation[];
};

type HouseholdIncomeAndExpenditure = {
  monthlyIncome: string;
  incomeConcept: string;
  monthlyExpenses: string;
  expenditureConcept: string;
  numberOfIncomeDependants: string;
};

type FinancialPortfolio = {
  currentAccount: string;
  savingsAccount: string;
  creditCard: string;
  shares: string;
  currentAccountInstitutions: string;
  savingsAccountInstitutions: string;
  creditCardCompanies: string;
  creditCardQuota: string;
  shareEntities: string;
  shareQuota: string;
};

type FinancialObligations = {
  hasOutstandingDebtsOrCredits: boolean;
  totalSumOfObligations: string;
  financialInstitutions: string;
  hasLiensOrClaims: boolean;
  mortgageLoan: string;
  financialInstitution: string;
};

type InformationPropertyOrRealEstate = {
  propertyOrRealEstate: string;
  amount: string;
  description: string;
};

type AssetsAndRealEstate = {
  ownsPropertyOrRealEstate: string;
  hasAnInterestInACompanyOrBusiness: string;
  informationPropertyOrRealEstate: InformationPropertyOrRealEstate;
};

type Obligations = {
  entityOrProduct: string;
  state: string;
  sector: string;
  totalBalance: string;
  currentBalance: string;
  quotaValue: string;
  balanceInArrears: string;
};

type CreditBureauInformation = {
  obligations: Obligations;
  remarks: string;
};

type FinancialAndEconomicAnalysisInformation = {
  householdIncomeAndExpenditure: HouseholdIncomeAndExpenditure;
  financialPortfolio: FinancialPortfolio;
  financialObligations: FinancialObligations;
  assetsAndRealEstate: AssetsAndRealEstate;
  creditBureauInformation: CreditBureauInformation;
};

type Referenceinformation = {
  fullNames: string;
  telephoneNumbers: string;
  howLongHaveYouKnownEachOther: string;
  whereDidYouMeet: string;
  whatDoesTheEvalueeDoForALiving: string;
  conceptOfThePersonBeingEvaluated: string;
};

type ReferenceFamilyInformation = {
  names: string;
  relationship: string;
  position: string;
  telephone: string;
};

type PersonalReferenceCheck = {
  referenceinformation: Referenceinformation[];
  hasFamilyMembersWorkingInTheCompany: string;
  referenceFamilyInformation: ReferenceFamilyInformation[];
  evaluatedByProvidingInformationInThePresentStudy: boolean;
};

type PhotographicRecord = {
  personWhoAttendedTheVisit: string;
  documentNumber: string;
  photographicRecordEvaluated: string;
  photographicRecordSocialAreas: string;
  photographicRecordOftheHouseNomenclature: string;
  photographicRecordOftheFacadeOfTheHouse: string;
  descriptionPhotographicRecord: string;
};

type FinalConcept = {
  generalConceptOfEvaluation: string;
  nameInformationAnalyst: string;
  nameHomeVisitor: string;
  nameQualityAnalyst: string;
  signatureInformationAnalyst: string;
  homeVisitorSignature: string;
  signatureQualityAnalyst: string;
};
