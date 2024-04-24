import { Injectable, Inject, Scope, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  CandidateAcademicData,
  CandidateBasicData,
  CandidateEmploymentData,
  CandidateFiles,
  CandidateHousingData,
  CandidatePeopleWithLiveData,
  CandidateProcessStatus,
  CandidateReferencesData,
  CandidateSpouseAndInlawData,
  Programmes,
} from '@prisma/client';
import { UtilsService } from '../../utils/utils.service';
import { FilesService } from '../../files/files.service';
import { FileTypes } from '../../types/FileTypes';
import { IParentsAndSiblingsData } from '../../types/CustomEntities';
import { CandidatesService } from '../candidates.service';

@Injectable({ scope: Scope.REQUEST })
export class InformationService {
  constructor(
    private prisma: UtilsService,
    @Inject(REQUEST) private readonly request: any,
    private readonly fileService: FilesService,
  ) {}

  async loadBasicData(
    basicData: CandidateBasicData,
    files: any[],
  ): Promise<string> {
    try {
      const formatBasicData: any = {
        firstLastName: String(basicData.firstLastName),
        middleLastName: String(basicData.middleLastName),
        firstName: String(basicData.firstName),
        middleName: String(basicData.middleName),
        documentType: Number(basicData.documentType),
        identificationNumber: String(basicData.identificationNumber),
        documentIssueDate: new Date(basicData.documentIssueDate),
        documentIssuePlace: Number(basicData.documentIssuePlace),
        birthDate: new Date(basicData.birthDate),
        age: Number(basicData.age),
        birthCountry: Number(basicData.birthCountry),
        birthDepartment: Number(basicData.birthDepartment),
        birthTown: Number(basicData.birthTown),
        residenceAddress: String(basicData.residenceAddress),
        cityResidence: Number(basicData.cityResidence),
        district: Number(basicData.district),
        hasMilitaryPassbook: Boolean(basicData.hasMilitaryPassbook),
        militaryPassbookNumber: String(basicData.militaryPassbookNumber),
        typeOfPassbook: String(basicData.typeOfPassbook),
        militaryDistrict: String(basicData.militaryDistrict),
        phone: String(basicData.phone),
        cellPhone: String(basicData.cellPhone),
        maritalStatus: Number(basicData.maritalStatus),
        childrenNumber: Number(basicData.childrenNumber),
        bodyMarkings: Number(basicData.bodyMarkings),
        otherBodyMarkings: String(basicData.otherBodyMarkings),
        locationBodyMarkings: String(basicData.locationBodyMarkings),
        RH: Number(basicData.RH),
        height: String(basicData.height),
        financiallyDependentPersons: Number(
          basicData.financiallyDependentPersons,
        ),
      };
      const candidateDataLoaded = await this.prisma.candidateBasicData.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: formatBasicData,
        create: { ...formatBasicData, candidateId: this.request.user.id },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            name: file.originalname.split('###')[1],
            response: file.buffer,
            size: Number(file.size),
            type: file.mimetype,
            encoding: file.encoding,
            module: 'users',
            fileType: FileTypes[file.originalname.split('###')[0]],
            userEntityId: this.request.user.id,
          };
          const responsefileService = await this.fileService.loadFile(
            signFile,
            candidateDataLoaded.id,
          );
          await this.prisma.candidateFiles.create({
            data: {
              candidateId: this.request.user.id,
              fileType: signFile.fileType,
              fileMongoPath: responsefileService._id,
            },
          });
        });
      await this.prisma.candidateProcessStatus.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: {
          basicData: 'SUCCESS',
        },
        create: {
          candidateId: this.request.user.id,
          basicData: 'SUCCESS',
        },
      });
      return 'Datos Básicos cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getBasicDataUser(): Promise<CandidateBasicData> {
    try {
      const userBasicData = await this.prisma.candidateBasicData.findUnique({
        where: {
          candidateId: this.request.user.id,
        },
      });
      return userBasicData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadAcademicData(
    academicData: CandidateAcademicData[],
  ): Promise<string> {
    try {
      academicData.map((data) => {
        data.candidateId = this.request.user.id;
      });
      const academicItemsByCandidate =
        await this.prisma.candidateAcademicData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      if (academicItemsByCandidate.length > 0) {
        academicData.map(async (data) => {
          await this.prisma.candidateAcademicData.update({
            where: {
              candidateId_indexItem: {
                candidateId: data.candidateId,
                indexItem: data.indexItem,
              },
            },
            data,
          });
        });
      } else {
        await this.prisma.candidateAcademicData.createMany({
          data: academicData,
        });
      }
      return 'Datos Academicos cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getAcademicDataUser(): Promise<CandidateAcademicData[]> {
    try {
      const userAcademicData = await this.prisma.candidateAcademicData.findMany(
        {
          where: {
            candidateId: this.request.user.id,
          },
        },
      );
      return userAcademicData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadEmploymentData(
    employmentData: CandidateEmploymentData[],
  ): Promise<string> {
    try {
      employmentData.map((data) => {
        data.candidateId = this.request.user.id;
      });
      const employmentItemsByCandidate =
        await this.prisma.candidateEmploymentData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      if (employmentItemsByCandidate.length > 0) {
        employmentData.map(async (data) => {
          await this.prisma.candidateEmploymentData.update({
            where: {
              candidateId_indexItem: {
                candidateId: data.candidateId,
                indexItem: data.indexItem,
              },
            },
            data,
          });
        });
      } else {
        await this.prisma.candidateEmploymentData.createMany({
          data: employmentData,
        });
      }
      return 'Datos Laborales cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getEmploymentDataUser(): Promise<CandidateEmploymentData[]> {
    try {
      const userEmploymentData =
        await this.prisma.candidateEmploymentData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      return userEmploymentData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadParentsAndSiblingsData(
    parentsAndSiblingsData: IParentsAndSiblingsData,
  ): Promise<string> {
    try {
      const data = {
        candidateId: this.request.user.id,
        motherName: parentsAndSiblingsData.motherName,
        motherAdrress: parentsAndSiblingsData.motherAdrress,
        motherAge: parentsAndSiblingsData.motherAge,
        motherPhone: parentsAndSiblingsData.motherPhone,
        motherLives: parentsAndSiblingsData.motherLives,
        motherLivesWith: parentsAndSiblingsData.motherLivesWith,
        motherProfession: parentsAndSiblingsData.motherProfession,
        motherCellPhone: parentsAndSiblingsData.motherCellPhone,
        fatherName: parentsAndSiblingsData.fatherName,
        fatherAdrress: parentsAndSiblingsData.fatherAdrress,
        fatherAge: parentsAndSiblingsData.fatherAge,
        fatherPhone: parentsAndSiblingsData.fatherPhone,
        fatherLives: parentsAndSiblingsData.fatherLives,
        fatherLivesWith: parentsAndSiblingsData.fatherLivesWith,
        fatherProfession: parentsAndSiblingsData.fatherProfession,
        fatherCellPhone: parentsAndSiblingsData.fatherCellPhone,
      };
      await this.prisma.candidateParentsData.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: data,
        create: data,
      });
      if (parentsAndSiblingsData.numberOfSiblings > 0) {
        parentsAndSiblingsData.siblingInformation.map((siblingsData) => {
          siblingsData.candidateId = this.request.user.id;
        });
        parentsAndSiblingsData.siblingInformation.map(async (siblingData) => {
          const { id, ...updateSiblingsData } = siblingData;
          await this.prisma.candidateSiblingsData.upsert({
            where: {
              candidateId_indexItem: {
                candidateId: siblingData.candidateId,
                indexItem: siblingData.indexItem,
              },
            },
            update: updateSiblingsData,
            create: siblingData,
          });
        });
      }
      await this.prisma.candidateProcessStatus.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: {
          parentsAndSiblingsData: 'SUCCESS',
        },
        create: {
          candidateId: this.request.user.id,
          parentsAndSiblingsData: 'SUCCESS',
        },
      });
      return 'Datos de los padres y hermanos cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getParentsAndSiblingsDataUser(): Promise<IParentsAndSiblingsData> {
    try {
      const userSiblingsData = await this.prisma.candidateSiblingsData.findMany(
        {
          where: {
            candidateId: this.request.user.id,
          },
        },
      );
      const userParentsData = await this.prisma.candidateParentsData.findUnique(
        {
          where: {
            candidateId: this.request.user.id,
          },
        },
      );
      const parentsAndSiblingsData: IParentsAndSiblingsData = {
        ...userParentsData,
        numberOfSiblings: userSiblingsData.length,
        siblingInformation: userSiblingsData,
      };
      return parentsAndSiblingsData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadSpouseAndInlawData(
    spouseInLawData: CandidateSpouseAndInlawData,
  ): Promise<string> {
    try {
      delete spouseInLawData.id;
      spouseInLawData.candidateId = this.request.user.id;
      await this.prisma.candidateSpouseAndInlawData.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: spouseInLawData,
        create: spouseInLawData,
      });
      await this.prisma.candidateProcessStatus.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: {
          spouseAndInLawsData: 'SUCCESS',
        },
        create: {
          candidateId: this.request.user.id,
          spouseAndInLawsData: 'SUCCESS',
        },
      });
      return 'Datos pareja y suegros cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getSpouseAndInlawDataUser(): Promise<CandidateSpouseAndInlawData> {
    try {
      const userSpouseAndInlawData =
        await this.prisma.candidateSpouseAndInlawData.findUnique({
          where: {
            candidateId: this.request.user.id,
          },
        });
      return userSpouseAndInlawData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadPeopleData(
    peopleWithLiveData: CandidatePeopleWithLiveData[],
  ): Promise<string> {
    try {
      peopleWithLiveData.map((data) => {
        data.candidateId = this.request.user.id;
      });
      const peopleWithLivesItems =
        await this.prisma.candidatePeopleWithLiveData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      if (peopleWithLivesItems.length > 0) {
        peopleWithLiveData.map(async (data) => {
          const { id, ...dataToLoad } = data;
          await this.prisma.candidatePeopleWithLiveData.update({
            where: {
              candidateId_indexItem: {
                candidateId: data.candidateId,
                indexItem: data.indexItem,
              },
            },
            data: dataToLoad,
          });
        });
      } else {
        await this.prisma.candidatePeopleWithLiveData.createMany({
          data: peopleWithLiveData,
        });
      }
      return 'Personas con las que vive cargadas correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadHousingData(housingData: CandidateHousingData): Promise<string> {
    try {
      delete housingData.id;
      housingData.candidateId = this.request.user.id;
      await this.prisma.candidateHousingData.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: {
          ...housingData,
          candidateId: this.request.user.id,
        },
        create: {
          ...housingData,
          candidateId: this.request.user.id,
        },
      });
      return 'Datos vivienda cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getPeopleWithLives(): Promise<CandidatePeopleWithLiveData[]> {
    try {
      const peopleLivesData =
        await this.prisma.candidatePeopleWithLiveData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      return peopleLivesData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getHousingData(): Promise<CandidateHousingData> {
    try {
      const housingData = await this.prisma.candidateHousingData.findUnique({
        where: {
          candidateId: this.request.user.id,
        },
      });
      return housingData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadReferencesData(
    referencesData: CandidateReferencesData[],
    files: any[],
  ): Promise<string> {
    try {
      referencesData.map((reference) => {
        reference.candidateId = this.request.user.id;
      });
      const references = await this.prisma.candidateReferencesData.findMany({
        where: {
          candidateId: this.request.user.id,
        },
      });
      if (references.length > 0) {
        referencesData.map(async (reference) => {
          const { id, ...referenceData } = reference;
          await this.prisma.candidateReferencesData.update({
            where: {
              candidateId_indexItem: {
                candidateId: reference.candidateId,
                indexItem: reference.indexItem,
              },
            },
            data: referenceData,
          });
        });
      } else {
        await this.prisma.candidateReferencesData.createMany({
          data: referencesData,
        });
        files &&
          files.length > 0 &&
          files.map(async (file: any) => {
            const signFile = {
              name: file.originalname.split('###')[2],
              response: file.buffer,
              size: Number(file.size),
              type: file.mimetype,
              encoding: file.encoding,
              module: 'users',
              fileType: FileTypes[file.originalname.split('###')[1]],
              userEntityId: this.request.user.id,
              fileIndex: Number(file.originalname.split('###')[0]),
            };
            const responsefileService = await this.fileService.loadFile(
              signFile,
              this.request.user.id,
            );
            await this.prisma.candidateFiles.create({
              data: {
                candidateId: this.request.user.id,
                fileType: signFile.fileType,
                fileMongoPath: responsefileService._id,
                fileIndex: signFile.fileIndex,
              },
            });
          });
      }
      await this.prisma.candidateProcessStatus.upsert({
        where: {
          candidateId: this.request.user.id,
        },
        update: {
          personalReferencesData: 'SUCCESS',
        },
        create: {
          candidateId: this.request.user.id,
          personalReferencesData: 'SUCCESS',
        },
      });
      return 'Referencias personales cargadas correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getReferencesDataUser(): Promise<CandidateReferencesData[]> {
    try {
      const userReferencesData =
        await this.prisma.candidateReferencesData.findMany({
          where: {
            candidateId: this.request.user.id,
          },
        });
      return userReferencesData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async completeCandidateProcess(): Promise<String> {
    try {
      await this.prisma.candidateProcessStatus.update({
        where: {
          candidateId: this.request.user.id,
        },
        data: {
          RICDate: new Date(),
        },
      });
      return 'Proceso del candidato finalizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStatusProcess(): Promise<CandidateProcessStatus | String> {
    try {
      const candidateStatus =
        await this.prisma.candidateProcessStatus.findUnique({
          where: {
            candidateId: this.request.user.id,
          },
        });
      return candidateStatus
        ? candidateStatus
        : 'Aún no hay información registrada por el candidato';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudiesScheduled(): Promise<Programmes[]> {
    try {
      return await this.prisma.programmes.findMany({
        where: {
          candidateId: this.request.user.id,
        },
        include: {
          candidate: {
            select: {
              email: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getCandidateFiles(): Promise<CandidateFiles[]> {
    try {
      const candidateFiles = await this.prisma.candidateFiles.findMany({
        where: {
          candidateId: this.request.user.id,
        },
      });
      return candidateFiles;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(CandidatesService.name);
}
