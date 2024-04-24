import {
  StudyVisitDomiciliaryFamilyData,
  StudyVisitDomiciliarySecondaryConcept,
  StudyVisitDomiciliarySecondaryEconomicIncomeData,
  StudyVisitDomiciliarySecondaryFamilyChildsData,
  StudyVisitDomiciliarySecondaryFamilyData,
  StudyVisitDomiciliarySecondaryHousingData,
  StudyVisitDomiciliarySecondaryHousingNeighborsData,
  StudyVisitDomiciliarySecondaryHousingPropertyItems,
} from '@prisma/client';
import {
  CandidateAcademicData,
  CandidateEmploymentData,
  CandidateHousingData,
  CandidateParentsData,
  CandidatePeopleWithLiveData,
  CandidateSiblingsData,
} from './schemas';

export interface IParentsAndSiblingsData extends CandidateParentsData {
  numberOfSiblings: number;
  siblingInformation: CandidateSiblingsData[];
}

export interface AcademicAndEmploymentData {
  candidateAcademicData: CandidateAcademicData[];
  candidateEmploymentData: CandidateEmploymentData[];
}

export interface PeopleLivesAndHousingData extends CandidateHousingData {
  housingData: CandidateHousingData;
  peopleNumber?: number;
  peopleInformation: CandidatePeopleWithLiveData[];
}

export interface PeopleLivesAndHousingDataSelect extends CandidateHousingData {
  peopleNumber?: number;
  peopleInformation: CandidatePeopleWithLiveData[];
}

export interface EconomicIncomeData
  extends StudyVisitDomiciliarySecondaryEconomicIncomeData {
  economicalDataRemarks: string;
}

export interface FamilyData {
  studyId: number;
  familyInformation: StudyVisitDomiciliaryFamilyData[];
  childInformation: StudyVisitDomiciliarySecondaryFamilyChildsData[];
  familyDataRemarks: string;
  secondaryFamilyDataRemarks: string;
}

export interface HousingData {
  studyId: number;
  housingInformation: StudyVisitDomiciliarySecondaryHousingData;
  neighborsInformation: StudyVisitDomiciliarySecondaryHousingNeighborsData[];
  ownsAssets: boolean;
  hasBusinessInterests: boolean;
  housingPropertyItems: StudyVisitDomiciliarySecondaryHousingPropertyItems[];
  housingDataRemarks: string;
}

export interface VisitDomiciliaryConcept {
  studyId: number;
  concept: StudyVisitDomiciliarySecondaryConcept;
}
