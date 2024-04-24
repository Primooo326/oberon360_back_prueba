import {
  User,
  CustomerParameterType,
  CustomerParameters,
  CandidateAcademicData,
  CandidateBasicData,
  CandidateEmploymentData,
  CandidateReferencesData,
  CandidateSpouseAndInlawData,
  Parameters,
  ParameterValueType,
  Roles,
  ParametersGroups,
  Modules,
} from '@prisma/client';
import IJwtDocuSignResponse from './IJwtDocuSignResponse';
import IAuthResponse from './IAuthResponse';
import { IParentsAndSiblingsData } from './CustomEntities';

export default interface IResponse {
  status: string;
  statusCode?: number;
  data:
    | string
    | boolean
    | User
    | Roles
    | CustomerParameterType[]
    | CustomerParameters[]
    | CandidateBasicData
    | CandidateAcademicData[]
    | CandidateEmploymentData
    | CandidateSpouseAndInlawData
    | CandidateReferencesData[]
    | Parameters[]
    | ParameterValueType[]
    | IJwtDocuSignResponse
    | IAuthResponse
    | IParentsAndSiblingsData
    | ParametersGroups[]
    | ParametersGroups
    | Modules[]
    | any;
}
