export type StudyReferencingEmploymentInactivityWorkData = {
  periodFrom: string;
  periodTo: string;
  occupancy: string;
};

export type StudyReferencingEmploymentWorkData = {
  candidateDataId: number;
  performanceEvaluation: string;
  informationProvidedBy: string;
  position: number;
  reasonForRetirement: number;
  sourceOfInquiry: number;
  remarks?: string;
};

export type StudyReferencingAcademicData = {
  candidateDataId: number;
  phone: string;
  folioOrRegistration: string;
  informationProvidedBy: string;
  position: number;
  SourceOfInquiry: number;
  remarks: string;
};

export type StudyReferencingReferencesData = {
  candidateDataId: number;
  ConceptOfTheEvaluated: string;
};

export type StudyReferencingEmployment = {
  studyId: number;
  inactivityWorkData: StudyReferencingEmploymentInactivityWorkData[];
  workData: StudyReferencingEmploymentWorkData[];
  concept: string;
  remarks: string;
};

export type StudyReferencingAcademic = {
  studyId: number;
  academicData: StudyReferencingAcademicData[];
  concept: string;
  remarks: string;
};

export type StudyReferencingReferences = {
  studyId: number;
  referencesData: StudyReferencingReferencesData[];
  concept: string;
  remarks: string;
};

export type StudyBackgroundCheckFamilyHistoryData = {
  studyId: number;
  fullName: string;
  relationship: number;
  remarks: string;
};

export type StudyBackgroundCheck = {
  studyId: number;
  nationalRegistryofCivilStatus: boolean;
  nationalRegistryofCivilStatusRemarks: string;
  nationalAttorneyGeneralsOffice: boolean;
  nationalAttorneyGeneralsOfficeRemarks: string;
  generalComptrolleroftheNation: boolean;
  generalComptrolleroftheNationRemarks: string;
  nationalPoliceDisqualifications: boolean;
  nationalPoliceDisqualificationsRemarks: string;
  NationalRegistrySystemofCorrectiveMeasuresRNMC: boolean;
  NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks: string;
  judicialBranch: boolean;
  judicialBranchRemarks: string;
  restrictivelistrecords: boolean;
  restrictivelistrecordsRemarks: string;
  ConsultationOfLAFTLists: boolean;
  ConsultationOfLAFTListsRemarks: string;
  ConsultationOfPEPSLists: boolean;
  ConsultationOfPEPSListsRemarks: string;
  SIMITTrafficInformation: boolean;
  SIMITTrafficInformationRemarks: string;
  RUNTTrafficInformation: boolean;
  RUNTTrafficInformationRemarks: string;
  Adverse: boolean;
  AdverseRemarks: string;
  MilitarySituation: boolean;
  MilitarySituationRemarks: string;
  familyHistoryData: StudyBackgroundCheckFamilyHistoryData[];
  concept: string;
  remarks: string;
};

export type StudyFinancialAccountsData = {
  entity: number;
  typeOfAccount: number;
  quality: string;
  status: number;
  currentBalance: number;
  rating: string;
  studyId: number;
};

export type StudyFinancialData = {
  sectorType: number;
  entity: number;
  product: number;
  quota: number;
  monthlyPayment: number;
  arrears: number;
  currentBalance: number;
  quality: string;
  behavior: string;
  studyId: number;
};

export type StudyFinancial = {
  studyId: number;
  studyFinancialData: StudyFinancialData[];
  studyFinancialAccountsData: StudyFinancialAccountsData[];
  totalQuota: number;
  totalMonthlyPayment: number;
  totalArrears: number;
  totalCurrentBalance: number;
  concept: string;
  remarks: string;
};
