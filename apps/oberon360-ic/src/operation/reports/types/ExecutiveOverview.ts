export type ExecutiveOverview = {
  personalData: PersonalDataFields;
  testsPerformed: TestsPerformedFields[];
  executiveSummary: ExecutiveSummaryFields;
  backgroundCheck: BackgroundCheckFields;
  academicAndEmploymentVerification: AcademicAndEmploymentVerificationFields;
};

type PersonalDataFields = {
  surnames: string;
  firstNames: string;
  company: string;
  typeOfDocument: string;
  identificationNumber: string;
  city: string;
};

type TestsPerformedFields = {
  tests: string[];
};

type ExecutiveSummaryFields = {
  testName: string;
  concept: string;
};

type BackgroundCheckFields = {
  concept: string;
};

type AcademicAndEmploymentVerificationFields = {
  academicConcept: string;
  employmentConcept: string;
};
