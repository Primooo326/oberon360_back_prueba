export interface RolesCreationRequest {
  name: string;
  description: string;
  scope: string;
  modules: number[];
}

export interface SignFileOptions {
  name: string;
  response: Buffer;
  size: number;
  encoding: string;
  fileIndex?: number;
  type: string;
  module: string;
  fileType: string;
  userEntityId: number;
}

export interface SignOperationalFileOptions {
  studyId: number;
  module: string;
  indexFile: number;
  fileType: string;
  name: string;
  size: number;
  encoding: string;
  response: Buffer;
}

export interface UsersCreationRequest {
  name: string;
  username: string;
  email: string;
  customerId: number;
  roleId: number;
  chargeId: number;
  status: boolean;
  signFile: SignFileOptions;
}

export interface OperationalGroupsRequest {
  id?: number;
  name: string;
  leader: number;
  team: number[];
  customers: number[];
  active: boolean;
}

export interface RequestService {
  isPackage: boolean;
  id: string;
}

export interface RequestCustom {
  id?: number;
  customerId: number;
  customerInternal: number;
  costCenterId: number;
  regional: number;
  billable: boolean;
  remarks: string;
  saveType: string;
  services: RequestService[];
  candidates?: any[];
  status?: string;
}
