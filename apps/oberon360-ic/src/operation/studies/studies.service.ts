import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as dayjs from 'dayjs';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  CandidateFiles,
  Programmes,
  Studies,
  StudyTypesFromServices,
  StudyVisitDomiciliaryRemarks,
  StudyVisitDomiciliarySecondaryEconomicIncomeData,
  StudyVisitDomiciliarySecondaryHousingPropertyItems,
} from '@prisma/client';
import { UtilsService } from '../../utils/utils.service';
import { CustomersService } from '../customers/customers.service';
import { MailService } from '../../utils/mail/mail.service';
import { FilesService } from '../../files/files.service';
import { StudiesStatus } from '../../types/StudiesStatus';
import IMailOptions from '../../types/MailOptions';
import { FileOperationTypes } from '../../types/FileOperationTypes';
import { StudyBackgroundCheck, StudyFinancial, StudyReferencingAcademic, StudyReferencingEmployment, StudyReferencingReferences } from '../../types/StudiesDataRequest';
import { EconomicIncomeData, FamilyData, HousingData, VisitDomiciliaryConcept } from '../../types/CustomEntities';

@Injectable({ scope: Scope.REQUEST })
export class StudiesService {
  constructor(
    private prisma: UtilsService,
    private customersService: CustomersService,
    private readonly mailService: MailService,
    @Inject(REQUEST) private readonly request: any,
    private readonly fileService: FilesService,
  ) {}

  async list(): Promise<any[]> {
    try {
      return await this.prisma.studies.findMany();
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudiesFromRequest(): Promise<any> {
    try {
      const listCustomers = await this.customersService.getCustomersList();
      const operationalGroupInfo =
        await this.prisma.operationalGroups.findFirst({
          include: {
            OperationalGroupsTeams: {
              where: {
                userId: this.request.user.id,
              },
            },
            OperationalGroupsCustomers: true,
          },
        });
      const list = await this.prisma.requestCandidates.findMany({
        where: {
          request: {
            customerId: {
              in: operationalGroupInfo.OperationalGroupsCustomers.map(
                (group) => group.customerId,
              ),
            },
            AND: {
              Studies: (() => {
                if (this.request.user.id === operationalGroupInfo.leader) {
                  return {
                    some: {
                      LeadAnalystId: this.request.user.id,
                    },
                  };
                } else {
                  return {
                    some: {
                      AnalystAssignedId: this.request.user.id,
                    },
                  };
                }
              })(),
            },
          },
        },
        include: {
          request: {
            select: {
              id: true,
              submitDate: true,
              customerId: true,
              Studies: {
                where: (() => {
                  if (this.request.user.id !== operationalGroupInfo.leader) {
                    return {
                      AnalystAssignedId: this.request.user.id,
                    };
                  } else {
                    return {
                      id: {
                        gt: 0,
                      },
                    };
                  }
                })(),
                select: {
                  id: true,
                  serviceId: true,
                  status: true,
                  AdvantageOfProgress: true,
                  LeadAnalyst: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  AnalystAssignedId: true,
                  assignmentDate: true,
                  dateCompletion: true,
                  candidateId: true,
                },
              },
            },
          },
          candidate: {
            select: {
              id: true,
              name: true,
              username: true,
              charge: true,
              email: true,
              CandidateProcessStatus: {
                select: {
                  RICDate: true,
                },
              },
            },
          },
        },
        orderBy: {
          request: {
            creationDate: 'desc',
          },
        },
      });
      const customersByGroup =
        operationalGroupInfo.OperationalGroupsCustomers.map((group) =>
          String(group.customerId),
        );
      const customers = listCustomers.data
        .filter((customer: any) =>
          customersByGroup.includes(customer.cliente_ID),
        )
        .map((customer) => {
          const servicios = [];
          customer.servicios.forEach((servicio) => {
            servicios.push({
              servicio_Descripcion: servicio.servicio_Descripcion,
              servicio_ID: servicio.servicio_ID,
            });
          });
          customer.paquetes.forEach((paquete) => {
            paquete.servicios.forEach((servicio) => {
              servicios.push({
                servicio_Descripcion: servicio.servicio_Descripcion,
                servicio_ID: servicio.servicio_ID,
              });
            });
          });
          return {
            cliente_ID: customer.cliente_ID,
            cliente_Nombre: customer.cliente_Nombre,
            servicios,
          };
        });
      const userAnalysts = await this.prisma.user.findMany({});
      const studiesTypes = await this.prisma.studyTypesFromServices.findMany({
        include: {
          studyType: {
            select: {
              needsProgramming: true,
            },
          },
        },
      });
      const mappedData = list.map((studyInfo) => {
        return {
          id: studyInfo.id,
          request: {
            id: studyInfo.request.id,
            submitDate: studyInfo.request.submitDate,
            customerId: studyInfo.request.customerId,
            customerName: customers.find(
              (customer) =>
                customer.cliente_ID === String(studyInfo.request.customerId),
            ).cliente_Nombre,
          },
          candidate: {
            id: studyInfo.candidate.id,
            name: studyInfo.candidate.name,
            username: studyInfo.candidate.username,
            charge: studyInfo.candidate.charge,
            email: studyInfo.candidate.email,
            RICDate: studyInfo.candidate.CandidateProcessStatus
              ? studyInfo.candidate.CandidateProcessStatus.RICDate
              : null,
          },
          services: studyInfo.request.Studies.map((service) => {
            return {
              id: service.id,
              serviceId: service.serviceId,
              serviceName: customers
                .find(
                  (customer) =>
                    customer.cliente_ID ===
                    String(studyInfo.request.customerId),
                )
                .servicios.find(
                  (oberonService: any) =>
                    oberonService.servicio_ID === String(service.serviceId),
                ).servicio_Descripcion,
              studyNeedsProgramming: studiesTypes.find(
                (studyType) => studyType.serviceId === service.serviceId,
              ).studyType.needsProgramming,
              studyCanBeTakenVirtual: studiesTypes.find(
                (studyType) => studyType.serviceId === service.serviceId,
              ).canBeTakenVirtual,
              status: service.status,
              assignmentDate: service.assignmentDate,
              AdvantageOfProgress: service.AdvantageOfProgress,
              LeadAnalyst: service.LeadAnalyst,
              dateCompletion: service.dateCompletion,
              AnalystAssigned:
                service.AnalystAssignedId !== null
                  ? {
                      id: service.AnalystAssignedId,
                      name: userAnalysts.find(
                        (user) => user.id === service.AnalystAssignedId,
                      ).name,
                    }
                  : { id: null },
              candidateId: service.candidateId,
            };
          }),
        };
      });
      return mappedData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(JSON.stringify({ code: error.code, message: error }));
    }
  }

  async getAllStudiesFromCandidate(candidateId: number, requestId: number) {
    try {
      return (await this.prisma.$queryRaw`
        SELECT S.*, STS.studyTypeId, ST.name as studyType
        FROM [dbo].[Studies] S
        INNER JOIN [dbo].[StudyTypesFromServices] STS ON STS.serviceId=S.serviceId
        INNER JOIN [dbo].[StudyTypes] ST ON ST.id=STS.studyTypeId
        WHERE S.candidateId=${candidateId} AND S.requestId=${requestId}
      `) as any[];
    } catch (error) {
      this.logger.error(error);
      throw new Error(JSON.stringify({ code: error.code, message: error }));
    }
  }

  async getStudiesFromCandidate(candidateId: number, requestId: number) {
    try {
      const listCustomers = await this.customersService.getCustomersList();
      const requestInfo = await this.prisma.requestCandidates.findFirst({
        where: {
          candidateId,
          requestId,
        },
        include: {
          candidate: true,
          request: {
            include: {
              Studies: true,
            },
          },
        },
      });
      const customer = listCustomers.data.find(
        (customer: any) =>
          customer.cliente_ID === String(requestInfo.request.customerId),
      );
      const servicios = [];
      customer.servicios.forEach((servicio) => {
        servicios.push({
          servicio_Descripcion: servicio.servicio_Descripcion,
          servicio_ID: servicio.servicio_ID,
        });
      });
      customer.paquetes.forEach((paquete) => {
        paquete.servicios.forEach((servicio) => {
          servicios.push({
            servicio_Descripcion: servicio.servicio_Descripcion,
            servicio_ID: servicio.servicio_ID,
          });
        });
      });
      const mappedData = {
        request: {
          id: requestInfo.request.id,
          creationDate: requestInfo.request.creationDate,
          submitDate: requestInfo.request.submitDate,
          status: requestInfo.request.status,
          customer: {
            id: requestInfo.request.customerId,
            customerName: customer.cliente_Nombre,
          },
        },
        candidate: {
          id: requestInfo.candidate.id,
          name: requestInfo.candidate.name,
          username: requestInfo.candidate.username,
          email: requestInfo.candidate.email,
          charge: requestInfo.candidate.charge,
        },
        studies: requestInfo.request.Studies.filter(
          (study) => study.AnalystAssignedId === this.request.user.id,
        ).map((studyInfo) => {
          return {
            id: studyInfo.id,
            AnalystAssignedId: studyInfo.AnalystAssignedId,
            status: studyInfo.status,
            service: {
              id: studyInfo.serviceId,
              serviceName: servicios.find(
                (oberonService: any) =>
                  oberonService.servicio_ID === String(studyInfo.serviceId),
              ).servicio_Descripcion,
            },
          };
        }),
      };
      return mappedData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(JSON.stringify({ code: error.code, message: error }));
    }
  }

  async create(study: Studies): Promise<String> {
    try {
      await this.prisma.studies.create({ data: study });
      return 'Estudio procesado corrrectamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async assignToAnalyst(studyId: number, analystId: number): Promise<String> {
    try {
      await this.prisma.studies.update({
        where: {
          id: studyId,
        },
        data: {
          AnalystAssignedId: analystId,
          status: StudiesStatus.ASSIGNED,
          assignmentDate: new Date(),
        },
      });
      return 'Estudio asignado corrrectamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async update(studyId: number, study: Studies): Promise<String> {
    try {
      await this.prisma.studies.update({
        where: { id: studyId },
        data: study,
      });
      return 'Estudio actualizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async scheduleService(event: Programmes): Promise<String> {
    try {
      event.programmedBy = this.request.user.id;
      const validateStudy = await this.prisma.programmes.findUnique({
        where: {
          candidateId_studyId: {
            candidateId: event.candidateId,
            studyId: event.studyId,
          },
        },
      });
      if (validateStudy) {
        throw new Error(
          'Ya hay un estudio de este tipo asignado para el candidato',
        );
      } else {
        const studyScheduled = await this.prisma.programmes.create({
          data: event,
        });
        const eventInfo = await this.prisma.programmes.findUnique({
          where: {
            id: studyScheduled.id,
          },
          include: {
            candidate: {
              select: {
                email: true,
              },
            },
          },
        });
        const customerRelation = await this.prisma.studies.findUnique({
          where: { id: validateStudy.studyId },
          include: { request: true },
        });
        this.sendCandidateMail(
          eventInfo.candidate.email,
          '',
          dayjs(eventInfo.dateTimeEvent).locale('es').format('llll'),
          customerRelation.request.customerId,
        );
        return 'Estudio agendado correctamente.';
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudyTypesFromServices(): Promise<StudyTypesFromServices[]> {
    try {
      return await this.prisma.studyTypesFromServices.findMany({
        include: {
          studyType: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private sendCandidateMail = async (
    emailNotification: string,
    eventType: string,
    dateTimeEvent: string,
    customerId: number,
  ) => {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, '../../../templates/email/sheduleStudy.hbs'),
      'utf8',
    );
    const customerLogo = await this.prisma.customerLogos.findUnique({
      where: { customerId },
    });
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      eventType,
      dateTimeEvent,
      customerImageName: customerLogo.imagePathName,
    });
    const mailOptions: IMailOptions = {
      from: 'Oberón <oberon@thomasseguridadintegral.com>',
      to: emailNotification,
      subject: 'Estudio Programado',
      html: htmlToSend,
    };
    await this.mailService.sendEmail(mailOptions);
  };

  // Data to studies

  async getCandidateFiles(candidateId: number): Promise<CandidateFiles[]> {
    try {
      const candidateFiles = await this.prisma.candidateFiles.findMany({
        where: {
          candidateId,
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

  async getCandidateBasicData(candidateId: number): Promise<any> {
    try {
      const userBasicData = (await this.prisma.$queryRaw`
      SELECT    
          bd.id,
          bd.firstLastName,
          bd.middleLastName,
          bd.firstName,
          bd.middleName,
          documentType.value as documentType,
          bd.identificationNumber,
          bd.documentIssueDate,
          documentIssuePlace.value as documentIssuePlace,
          bd.birthDate,
          bd.age,
          birthCountry.value as birthCountry,
          birthDepartment.value as birthDepartment,
          birthTown.value as birthTown,
          bd.residenceAddress,
          cityResidence.value as cityResidence,
          district.value as district,
          bd.militaryPassbookNumber,
          bd.typeOfPassbook,
          bd.militaryDistrict,
          bd.phone,
          bd.cellPhone,
          bd.childrenNumber,
          maritalStatus.value as maritalStatus,
          bodyMarkings.value as bodyMarkings,
          bd.otherBodyMarkings,
          bd.locationBodyMarkings,
          RH.value as RH,
          bd.height, bd.financiallyDependentPersons
      FROM
          CandidateBasicData bd
          LEFT JOIN Parameters documentType ON bd.documentType = documentType.id
          LEFT JOIN Parameters documentIssuePlace ON bd.documentIssuePlace = documentIssuePlace.id
          LEFT JOIN Parameters birthCountry ON bd.birthCountry = birthCountry.id
          LEFT JOIN Parameters birthDepartment ON bd.birthDepartment = birthDepartment.id
          LEFT JOIN Parameters birthTown ON bd.birthTown = birthTown.id
          LEFT JOIN Parameters cityResidence ON bd.cityResidence = cityResidence.id
          LEFT JOIN Parameters district ON bd.district = district.id
          LEFT JOIN Parameters maritalStatus ON bd.maritalStatus = maritalStatus.id
          LEFT JOIN Parameters bodyMarkings ON bd.bodyMarkings = bodyMarkings.id    
          LEFT JOIN Parameters RH ON bd.RH = RH.id
      WHERE candidateId = ${candidateId}
      `) as any[];
      return userBasicData[0];
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getFamilyData(candidateId: number): Promise<any> {
    try {
      const parentsData = (await this.prisma.$queryRaw`
        SELECT 
        PD.id, PD.motherName, PD.motherAdrress, PD.motherAge, PD.motherPhone, PD.motherLives, PD.motherLivesWith,
        motherProfession.value as motherProfession, PD.motherCellPhone,
        PD.id, PD.fatherName, PD.fatherAdrress, PD.fatherAge, PD.fatherPhone, PD.fatherLives, PD.fatherLivesWith,
        fatherProfession.value as fatherProfession, PD.fatherCellPhone
        FROM CandidateParentsData PD
        LEFT JOIN Parameters motherProfession on PD.motherProfession=motherProfession.id
        LEFT JOIN Parameters fatherProfession on PD.fatherProfession=fatherProfession.id
        WHERE candidateId = ${candidateId}
      `) as any[];
      const siblingsData = (await this.prisma.$queryRaw`
        SELECT SD.id, SD.indexItem, SD.fullName, profession.value as profession, SD.address, SD.phone
        FROM CandidateSiblingsData SD
        LEFT JOIN Parameters profession on SD.profession=profession.id
        WHERE candidateId = ${candidateId}
      `) as any[];
      return {
        parentsData: parentsData[0],
        siblingsData: siblingsData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getFamilySecondaryData(candidateId: number): Promise<any> {
    try {
      const spouseData = await this.prisma.$queryRaw`
      SELECT
        SD.fullName, SD.identificationNumber, SD.birthDate, birthDepartment.value as birthDepartment,
        birthTown.value as birthTown, SD.yearsOfAcquaintances, SD.age, SD.phoneNumber, SD.cellPhoneNumber,
        profession.value as profession
        FROM [dbo].[CandidateSpouseAndInlawData] as SD
        LEFT JOIN Parameters birthDepartment on SD.birthDepartment=birthDepartment.id
        LEFT JOIN Parameters birthTown on SD.birthTown=birthTown.id
        LEFT JOIN Parameters profession on SD.profession=profession.id
      WHERE candidateId = ${candidateId}`;
      const peopleWithLiveData = await this.prisma.$queryRaw`
      SELECT 
        PD.fullName, PD.age, PD.phone, relationship.value as relationship, maritalStatus.value as maritalStatus,
        profession.value as profession
        FROM [dbo].[CandidatePeopleWithLiveData] PD
        LEFT JOIN Parameters relationship on PD.relationship=relationship.id
        LEFT JOIN Parameters maritalStatus on PD.maritalStatus=maritalStatus.id
        LEFT JOIN Parameters profession on PD.profession=profession.id
      WHERE candidateId=${candidateId}`;
      return {
        spouseData: spouseData[0],
        peopleWithLiveData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getEmploymentData(candidateId: number): Promise<any> {
    try {
      const employmentData = (await this.prisma.$queryRaw`
      SELECT
        ED.candidateId, ED.charge, ED.companyName, ED.dateEntry, ED.dateLeaving,
        ED.bossName, ED.bossPhone, ED.bossCharge
        FROM [dbo].[CandidateEmploymentData] as ED
      WHERE candidateId = ${candidateId}`) as any[];
      return {
        employmentData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getAcademicData(candidateId: number): Promise<any> {
    try {
      const academicData = (await this.prisma.$queryRaw`
      SELECT
        AD.candidateId, AD.academycDegree, academyName.value as academyName,
        AD.dateOfGrade, studyType.value as studyType
        FROM [dbo].[CandidateAcademicData] as AD
        LEFT JOIN Parameters academyName on AD.academyName=academyName.id
        LEFT JOIN Parameters studyType on AD.studyType=studyType.id
      WHERE candidateId = ${candidateId}`) as any[];
      return {
        academicData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getVisitDomicilaryRemarks(
    studyId: number,
  ): Promise<StudyVisitDomiciliaryRemarks> {
    try {
      const remarksData =
        await this.prisma.studyVisitDomiciliaryRemarks.findFirst({
          where: {
            studyId,
          },
        });
      return remarksData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadVisitDomicilaryRemarks(
    remarks: StudyVisitDomiciliaryRemarks,
  ): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: remarks.studyId,
        },
        create: remarks,
        update: remarks,
      });
      return 'Información guardada';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getHousingData(studyId: number, candidateId: number): Promise<any> {
    try {
      const housingData = (await this.prisma.$queryRaw`
        SELECT
          HD.candidateId, houseType.value as houseType, HD.dateFrom,
          HD.ownerName, HD.address, district.value as district, HD.stratum
          FROM [dbo].[CandidateHousingData] as HD
          LEFT JOIN Parameters as houseType ON houseType.id=HD.houseType
          LEFT JOIN Parameters as district ON district.id=HD.district
        WHERE candidateId = ${candidateId}`) as any;
      const peopleWithLiveData = (await this.prisma.$queryRaw`
        SELECT
          PLD.candidateId, PLD.fullName, PLD.age, PLD.phone,
          relationship.value as relationship, maritalStatus.value as maritalStatus, profession.value as profession
          FROM [dbo].[CandidatePeopleWithLiveData] as PLD
          LEFT JOIN Parameters as relationship ON relationship.id=PLD.relationship
          LEFT JOIN Parameters as maritalStatus ON maritalStatus.id=PLD.maritalStatus
          LEFT JOIN Parameters as profession ON profession.id=PLD.profession
        WHERE candidateId = ${candidateId}`) as any[];
      const neighborhoodData =
        await this.prisma.studyVisitDomiciliarySecondaryHousingNeighborsData.findMany(
          {
            where: {
              studyId,
            },
          },
        );
      const housingInformation =
        await this.prisma.studyVisitDomiciliarySecondaryHousingData.findFirst({
          where: {
            studyId,
          },
        });
      const neighborsInformation =
        await this.prisma.studyVisitDomiciliarySecondaryHousingNeighborsData.findMany(
          {
            where: {
              studyId,
            },
          },
        );
      const housingPropertyData =
        await this.prisma.studyVisitDomiciliarySecondaryHousingPropertyData.findFirst(
          {
            where: {
              studyId,
            },
          },
        );
      let housingPropertyItems: StudyVisitDomiciliarySecondaryHousingPropertyItems[] =
        [];
      housingPropertyData &&
        (housingPropertyItems =
          await this.prisma.studyVisitDomiciliarySecondaryHousingPropertyItems.findMany(
            {
              where: {
                studyDataId: housingPropertyData.id,
              },
            },
          ));
      return {
        housingData: housingData[0],
        peopleWithLiveData,
        neighborhoodData,
        housingInformation,
        neighborsInformation,
        housingPropertyData,
        housingPropertyItems,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadHousingData(housingData: HousingData): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliarySecondaryHousingData.upsert({
        where: {
          studyId: housingData.studyId,
        },
        create: {
          studyId: housingData.studyId,
          housingStatus: housingData.housingInformation.housingStatus,
          accessRoads: housingData.housingInformation.accessRoads,
          externalPresentation:
            housingData.housingInformation.externalPresentation,
          internalPresentation:
            housingData.housingInformation.internalPresentation,
          numberFamiliesLivingIn:
            housingData.housingInformation.numberFamiliesLivingIn,
          totalPersonsInTheDwelling:
            housingData.housingInformation.totalPersonsInTheDwelling,
          environmentOfTheSector:
            housingData.housingInformation.environmentOfTheSector,
          descriptionOfTheHouse:
            housingData.housingInformation.descriptionOfTheHouse,
          vulnerabilityOfTheSector:
            housingData.housingInformation.vulnerabilityOfTheSector,
          publicServicesAndDomiciliaryServices:
            housingData.housingInformation.publicServicesAndDomiciliaryServices,
        },
        update: {
          housingStatus: housingData.housingInformation.housingStatus,
          accessRoads: housingData.housingInformation.accessRoads,
          externalPresentation:
            housingData.housingInformation.externalPresentation,
          internalPresentation:
            housingData.housingInformation.internalPresentation,
          numberFamiliesLivingIn:
            housingData.housingInformation.numberFamiliesLivingIn,
          totalPersonsInTheDwelling:
            housingData.housingInformation.totalPersonsInTheDwelling,
          environmentOfTheSector:
            housingData.housingInformation.environmentOfTheSector,
          descriptionOfTheHouse:
            housingData.housingInformation.descriptionOfTheHouse,
          vulnerabilityOfTheSector:
            housingData.housingInformation.vulnerabilityOfTheSector,
          publicServicesAndDomiciliaryServices:
            housingData.housingInformation.publicServicesAndDomiciliaryServices,
        },
      });
      await this.prisma.studyVisitDomiciliarySecondaryHousingNeighborsData.deleteMany(
        {
          where: {
            studyId: housingData.studyId,
          },
        },
      );
      await this.prisma.studyVisitDomiciliarySecondaryHousingNeighborsData.createMany(
        {
          data: housingData.neighborsInformation.map((item: any) => {
            return {
              studyId: housingData.studyId,
              fullNames: item.fullNames,
              address: item.address,
              phone: item.phone,
              relationship: item.relationship,
            };
          }),
        },
      );
      const housingPropertyData =
        await this.prisma.studyVisitDomiciliarySecondaryHousingPropertyData.upsert(
          {
            where: {
              studyId: housingData.studyId,
            },
            create: {
              studyId: housingData.studyId,
              ownsAssets: housingData.ownsAssets,
              hasBusinessInterests: housingData.hasBusinessInterests,
            },
            update: {
              ownsAssets: housingData.ownsAssets,
              hasBusinessInterests: housingData.hasBusinessInterests,
            },
          },
        );
      await this.prisma.studyVisitDomiciliarySecondaryHousingPropertyItems.deleteMany(
        {
          where: {
            studyDataId: housingPropertyData.id,
          },
        },
      );
      await this.prisma.studyVisitDomiciliarySecondaryHousingPropertyItems.createMany(
        {
          data: housingData.housingPropertyItems.map((item: any) => {
            return {
              studyDataId: housingPropertyData.id,
              name: item.name,
              quantity: Number(item.quantity),
              description: item.description,
            };
          }),
        },
      );
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: housingData.studyId,
        },
        create: {
          studyId: housingData.studyId,
          housingDataRemarks: housingData.housingDataRemarks,
        },
        update: {
          housingDataRemarks: housingData.housingDataRemarks,
        },
      });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getEconomicIncomeData(
    studyId: number,
  ): Promise<StudyVisitDomiciliarySecondaryEconomicIncomeData> {
    try {
      return await this.prisma.studyVisitDomiciliarySecondaryEconomicIncomeData.findFirst(
        {
          where: {
            studyId,
          },
        },
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadEconomicIncomeData(
    economicData: EconomicIncomeData,
  ): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliarySecondaryEconomicIncomeData.upsert(
        {
          where: {
            studyId: economicData.studyId,
          },
          create: {
            studyId: economicData.studyId,
            monthlyIncome: economicData.monthlyIncome,
            incomeConcept: economicData.incomeConcept,
            monthlyExpenses: economicData.monthlyExpenses,
            expenseConcept: economicData.expenseConcept,
            numberOfContributors: Number(economicData.numberOfContributors),
          },
          update: {
            monthlyIncome: economicData.monthlyIncome,
            incomeConcept: economicData.incomeConcept,
            monthlyExpenses: economicData.monthlyExpenses,
            expenseConcept: economicData.expenseConcept,
            numberOfContributors: Number(economicData.numberOfContributors),
          },
        },
      );
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: economicData.studyId,
        },
        create: {
          studyId: economicData.studyId,
          economicalDataRemarks: economicData.economicalDataRemarks,
        },
        update: { economicalDataRemarks: economicData.economicalDataRemarks },
      });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadVisitDomicilaryConcept(
    visitDomiciliaryConcept: VisitDomiciliaryConcept,
    files: any[],
  ): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliarySecondaryConcept.upsert({
        where: {
          studyId: visitDomiciliaryConcept.studyId,
        },
        create: {
          studyId: visitDomiciliaryConcept.studyId,
          descriptionPhotographicRecord:
            visitDomiciliaryConcept.concept.descriptionPhotographicRecord,
          conceptOfVisit: visitDomiciliaryConcept.concept.conceptOfVisit,
          remarks: visitDomiciliaryConcept.concept.remarks,
        },
        update: {
          descriptionPhotographicRecord:
            visitDomiciliaryConcept.concept.descriptionPhotographicRecord,
          conceptOfVisit: visitDomiciliaryConcept.concept.conceptOfVisit,
          remarks: visitDomiciliaryConcept.concept.remarks,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: visitDomiciliaryConcept.studyId,
            module: FileOperationTypes.VISIT_DOMICILIARY_FINAL_CONCEPT,
            indexFile: file.originalname.split('###')[0],
            fileType: file.mimetype,
            name: file.originalname.split('###')[1],
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          await this.fileService.loadOperationalFile(
            visitDomiciliaryConcept.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getVisitDomicilaryConcept(studyId: number): Promise<any> {
    try {
      const visitDomicilaryConceptData =
        await this.prisma.studyVisitDomiciliarySecondaryConcept.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.VISIT_DOMICILIARY_FINAL_CONCEPT,
        studyId,
      );
      return {
        visitDomicilaryConceptData,
        photoRegistration: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadVisitDomiciliaryReferencingData(
    studyId: number,
    referencingRemark: string,
  ): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: studyId,
        },
        create: {
          studyId: studyId,
          referencingRemarks: referencingRemark,
        },
        update: { referencingRemarks: referencingRemark },
      });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getSecondaryStudyFamilyData(studyId: number): Promise<any> {
    try {
      const childInformation =
        await this.prisma.studyVisitDomiciliarySecondaryFamilyChildsData.findMany(
          {
            where: {
              studyId,
            },
          },
        );
      return {
        childInformation,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadSecondaryFamilyData(familyData: FamilyData): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliarySecondaryFamilyChildsData.deleteMany(
        {
          where: {
            studyId: familyData.studyId,
          },
        },
      );
      await this.prisma.studyVisitDomiciliarySecondaryFamilyChildsData.createMany(
        {
          data: familyData.childInformation.map((item) => {
            return {
              studyId: familyData.studyId,
              fullNames: item.fullNames,
              identificationNumber: item.identificationNumber,
              birthDate: item.birthDate,
              birthCountry: item.birthCountry,
              birthDepartment: item.birthDepartment,
              birthTown: item.birthTown,
              livesWith: item.livesWith,
              age: item.age,
              phone: item.phone,
              cellPhone: item.cellPhone,
              profession: item.profession,
            };
          }),
        },
      );
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: familyData.studyId,
        },
        create: {
          studyId: familyData.studyId,
          secondaryFamilyDataRemarks: familyData.secondaryFamilyDataRemarks,
        },
        update: {
          secondaryFamilyDataRemarks: familyData.secondaryFamilyDataRemarks,
        },
      });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudyFamilyData(studyId: number): Promise<any> {
    try {
      const familyData =
        await this.prisma.studyVisitDomiciliaryFamilyData.findMany({
          where: {
            studyId,
          },
        });
      return {
        familyData,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadFamilyData(familyData: FamilyData): Promise<string> {
    try {
      await this.prisma.studyVisitDomiciliaryFamilyData.deleteMany({
        where: {
          studyId: familyData.studyId,
        },
      });
      await this.prisma.studyVisitDomiciliaryFamilyData.createMany({
        data: familyData.familyInformation.map((item) => {
          return {
            studyId: familyData.studyId,
            fullNames: item.fullNames,
            relationShip: item.relationShip,
            charge: item.charge,
            phone: item.phone,
          };
        }),
      });
      await this.prisma.studyVisitDomiciliaryRemarks.upsert({
        where: {
          studyId: familyData.studyId,
        },
        create: {
          studyId: familyData.studyId,
          familyDataRemarks: familyData.familyDataRemarks,
        },
        update: {
          familyDataRemarks: familyData.familyDataRemarks,
        },
      });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadCandidateEmploymentStudyData(
    employmentStudyData: StudyReferencingEmployment,
    files: any[],
  ): Promise<string> {
    try {
      employmentStudyData.workData.map(async (workData) => {
        await this.prisma.studyReferencingEmploymentData.upsert({
          where: {
            candidateDataId: workData.candidateDataId,
          },
          create: {
            candidateDataId: workData.candidateDataId,
            performanceEvaluation: workData.performanceEvaluation,
            informationProvidedBy: workData.informationProvidedBy,
            position: workData.position,
            reasonForRetirement: workData.reasonForRetirement,
            sourceOfInquiry: workData.sourceOfInquiry,
            remarks: workData.remarks,
          },
          update: {
            candidateDataId: workData.candidateDataId,
            performanceEvaluation: workData.performanceEvaluation,
            informationProvidedBy: workData.informationProvidedBy,
            position: workData.position,
            reasonForRetirement: workData.reasonForRetirement,
            sourceOfInquiry: workData.sourceOfInquiry,
            remarks: workData.remarks,
          },
        });
      });
      await this.prisma.studyReferencingEmploymentWorkInactivityData.deleteMany(
        {
          where: {
            studyId: employmentStudyData.studyId,
          },
        },
      );
      await this.prisma.studyReferencingEmploymentWorkInactivityData.createMany(
        {
          data: employmentStudyData.inactivityWorkData.map(
            (inactivityWorkData) => {
              return {
                studyId: employmentStudyData.studyId,
                periodFrom: inactivityWorkData.periodFrom,
                periodTo: inactivityWorkData.periodTo,
                occupancy: inactivityWorkData.occupancy,
              };
            },
          ),
        },
      );
      await this.prisma.studyReferencingEmploymentResult.upsert({
        where: {
          studyId: employmentStudyData.studyId,
        },
        create: {
          studyId: employmentStudyData.studyId,
          concept: employmentStudyData.concept,
          remarks: employmentStudyData.remarks,
        },
        update: {
          studyId: employmentStudyData.studyId,
          concept: employmentStudyData.concept,
          remarks: employmentStudyData.remarks,
        },
      });
      const studyProcess = await this.prisma.studies.findFirst({
        where: {
          id: employmentStudyData.studyId,
        },
      });
      await this.prisma.studies.update({
        where: {
          id: employmentStudyData.studyId,
        },
        data: {
          studyStage: String(studyProcess.studyStage).includes('1')
            ? studyProcess.studyStage
            : `${
                studyProcess.studyStage === null ? '' : studyProcess.studyStage
              }1`,
          AdvantageOfProgress: String(studyProcess.studyStage).includes('1')
            ? studyProcess.AdvantageOfProgress
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? 100
            : studyProcess.AdvantageOfProgress + 33,
          status: String(studyProcess.studyStage).includes('1')
            ? studyProcess.status
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? StudiesStatus.UNDER_REVIEW
            : StudiesStatus.IN_PROCESS,
          dateCompletion: String(studyProcess.studyStage).includes('1')
            ? studyProcess.dateCompletion
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? new Date()
            : studyProcess.dateCompletion,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: employmentStudyData.studyId,
            module: FileOperationTypes.REFERENCING_EMPLOYMENT_FILE,
            indexFile: 0,
            fileType: file.mimetype,
            name: file.originalname,
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          await this.fileService.loadOperationalFile(
            employmentStudyData.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getCandidateEmploymentStudyData(
    studyId: number,
    candidateId: number,
  ): Promise<any> {
    try {
      const userEmploymentData =
        await this.prisma.candidateEmploymentData.findMany({
          where: {
            candidateId,
          },
        });
      const studyData =
        await this.prisma.studyReferencingEmploymentData.findMany({
          where: {
            candidateData: {
              candidateId,
            },
          },
        });
      const inactivityWorkData =
        await this.prisma.studyReferencingEmploymentWorkInactivityData.findMany(
          {
            where: {
              studyId,
            },
          },
        );
      const studyEmploymentResult =
        await this.prisma.studyReferencingEmploymentResult.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.REFERENCING_EMPLOYMENT_FILE,
        studyId,
      );
      return {
        candidateData: userEmploymentData,
        studyData,
        inactivityWorkData,
        studyEmploymentResult,
        annexes: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadCandidateAcademicStudyData(
    academicStudyData: StudyReferencingAcademic,
    files: any[],
  ): Promise<string> {
    try {
      academicStudyData.academicData.map(async (academicData) => {
        await this.prisma.studyReferencingAcademicData.upsert({
          where: {
            candidateDataId: academicData.candidateDataId,
          },
          create: {
            candidateDataId: academicData.candidateDataId,
            phone: academicData.phone,
            folioOrRegistration: academicData.folioOrRegistration,
            informationProvidedBy: academicData.informationProvidedBy,
            position: academicData.position,
            SourceOfInquiry: academicData.SourceOfInquiry,
            remarks: academicData.remarks,
          },
          update: {
            candidateDataId: academicData.candidateDataId,
            phone: academicData.phone,
            folioOrRegistration: academicData.folioOrRegistration,
            informationProvidedBy: academicData.informationProvidedBy,
            position: academicData.position,
            SourceOfInquiry: academicData.SourceOfInquiry,
            remarks: academicData.remarks,
          },
        });
      });
      await this.prisma.studyReferencingAcademicResult.upsert({
        where: {
          studyId: academicStudyData.studyId,
        },
        create: {
          studyId: academicStudyData.studyId,
          concept: academicStudyData.concept,
          remarks: academicStudyData.remarks,
        },
        update: {
          studyId: academicStudyData.studyId,
          concept: academicStudyData.concept,
          remarks: academicStudyData.remarks,
        },
      });
      const studyProcess = await this.prisma.studies.findFirst({
        where: {
          id: academicStudyData.studyId,
        },
      });
      await this.prisma.studies.update({
        where: {
          id: academicStudyData.studyId,
        },
        data: {
          studyStage: String(studyProcess.studyStage).includes('2')
            ? studyProcess.studyStage
            : `${
                studyProcess.studyStage === null ? '' : studyProcess.studyStage
              }2`,
          AdvantageOfProgress: String(studyProcess.studyStage).includes('2')
            ? studyProcess.AdvantageOfProgress
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? 100
            : studyProcess.AdvantageOfProgress + 33,
          status: String(studyProcess.studyStage).includes('2')
            ? studyProcess.status
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? StudiesStatus.UNDER_REVIEW
            : StudiesStatus.IN_PROCESS,
          dateCompletion: String(studyProcess.studyStage).includes('2')
            ? studyProcess.dateCompletion
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? new Date()
            : studyProcess.dateCompletion,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: academicStudyData.studyId,
            module: FileOperationTypes.REFERENCING_ACADEMIC_FILE,
            indexFile: 0,
            fileType: file.mimetype,
            name: file.originalname,
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          console.log(signFile);
          await this.fileService.loadOperationalFile(
            academicStudyData.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getCandidateAcademicData(
    studyId: number,
    candidateId: number,
  ): Promise<any> {
    try {
      const userAcademicData = await this.prisma.candidateAcademicData.findMany(
        {
          where: {
            candidateId,
          },
        },
      );
      const studyData = await this.prisma.studyReferencingAcademicData.findMany(
        {
          where: {
            candidateData: {
              candidateId,
            },
          },
        },
      );
      const studyAcademicResult =
        await this.prisma.studyReferencingAcademicResult.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.REFERENCING_ACADEMIC_FILE,
        studyId,
      );
      return {
        candidateData: userAcademicData,
        studyData,
        studyAcademicResult,
        annexes: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadCandidateReferencesStudyData(
    referencesStudyData: StudyReferencingReferences,
    files: any[],
  ): Promise<string> {
    try {
      referencesStudyData.referencesData.map(async (referenceData) => {
        await this.prisma.studyReferencingReferencesData.upsert({
          where: {
            candidateDataId: referenceData.candidateDataId,
          },
          create: {
            candidateDataId: referenceData.candidateDataId,
            ConceptOfTheEvaluated: referenceData.ConceptOfTheEvaluated,
          },
          update: {
            candidateDataId: referenceData.candidateDataId,
            ConceptOfTheEvaluated: referenceData.ConceptOfTheEvaluated,
          },
        });
      });
      await this.prisma.studyReferencingReferencesResult.upsert({
        where: {
          studyId: referencesStudyData.studyId,
        },
        create: {
          studyId: referencesStudyData.studyId,
          concept: referencesStudyData.concept,
          remarks: referencesStudyData.remarks,
        },
        update: {
          studyId: referencesStudyData.studyId,
          concept: referencesStudyData.concept,
          remarks: referencesStudyData.remarks,
        },
      });
      const studyProcess = await this.prisma.studies.findFirst({
        where: {
          id: referencesStudyData.studyId,
        },
      });
      await this.prisma.studies.update({
        where: {
          id: referencesStudyData.studyId,
        },
        data: {
          studyStage: String(studyProcess.studyStage).includes('3')
            ? studyProcess.studyStage
            : `${
                studyProcess.studyStage === null ? '' : studyProcess.studyStage
              }3`,
          AdvantageOfProgress: String(studyProcess.studyStage).includes('3')
            ? studyProcess.AdvantageOfProgress
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? 100
            : studyProcess.AdvantageOfProgress + 33,
          status: String(studyProcess.studyStage).includes('3')
            ? studyProcess.status
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? StudiesStatus.UNDER_REVIEW
            : StudiesStatus.IN_PROCESS,
          dateCompletion: String(studyProcess.studyStage).includes('3')
            ? studyProcess.dateCompletion
            : studyProcess.studyStage !== null &&
              String(studyProcess.studyStage).length === 2
            ? new Date()
            : studyProcess.dateCompletion,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: referencesStudyData.studyId,
            module: FileOperationTypes.REFERENCING_REFERENCES_FILE,
            indexFile: 0,
            fileType: file.mimetype,
            name: file.originalname,
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          await this.fileService.loadOperationalFile(
            referencesStudyData.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getCandidateReferencesData(
    studyId: number,
    candidateId: number,
  ): Promise<any> {
    try {
      const userReferencesData =
        await this.prisma.candidateReferencesData.findMany({
          where: {
            candidateId,
          },
        });
      const studyData =
        await this.prisma.studyReferencingReferencesData.findMany({
          where: {
            candidateData: {
              candidateId,
            },
          },
        });
      const studyReferencesResult =
        await this.prisma.studyReferencingReferencesResult.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.REFERENCING_REFERENCES_FILE,
        studyId,
      );
      return {
        candidateData: userReferencesData,
        studyData,
        studyReferencesResult,
        annexes: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadStudyBackgroundCheckData(
    backgroundCheckData: StudyBackgroundCheck,
    files: any[],
  ): Promise<string> {
    try {
      await this.prisma.studyBackgroundCheckFamilyHistoryData.deleteMany({
        where: {
          studyId: backgroundCheckData.studyId,
        },
      });
      await this.prisma.studyBackgroundCheckFamilyHistoryData.createMany({
        data: backgroundCheckData.familyHistoryData.map((familyHistory) => {
          return {
            studyId: backgroundCheckData.studyId,
            fullName: familyHistory.fullName,
            relationship: familyHistory.relationship,
            remarks: familyHistory.remarks,
          };
        }),
      });
      await this.prisma.studyBackgroundCheckData.upsert({
        where: {
          studyId: backgroundCheckData.studyId,
        },
        create: {
          studyId: backgroundCheckData.studyId,
          nationalRegistryofCivilStatus:
            backgroundCheckData.nationalRegistryofCivilStatus,
          nationalRegistryofCivilStatusRemarks:
            backgroundCheckData.nationalRegistryofCivilStatusRemarks,
          nationalAttorneyGeneralsOffice:
            backgroundCheckData.nationalAttorneyGeneralsOffice,
          nationalAttorneyGeneralsOfficeRemarks:
            backgroundCheckData.nationalAttorneyGeneralsOfficeRemarks,
          generalComptrolleroftheNation:
            backgroundCheckData.generalComptrolleroftheNation,
          generalComptrolleroftheNationRemarks:
            backgroundCheckData.generalComptrolleroftheNationRemarks,
          nationalPoliceDisqualifications:
            backgroundCheckData.nationalPoliceDisqualifications,
          nationalPoliceDisqualificationsRemarks:
            backgroundCheckData.nationalPoliceDisqualificationsRemarks,
          NationalRegistrySystemofCorrectiveMeasuresRNMC:
            backgroundCheckData.NationalRegistrySystemofCorrectiveMeasuresRNMC,
          NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks:
            backgroundCheckData.NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks,
          judicialBranch: backgroundCheckData.judicialBranch,
          judicialBranchRemarks: backgroundCheckData.judicialBranchRemarks,
          restrictivelistrecords: backgroundCheckData.restrictivelistrecords,
          restrictivelistrecordsRemarks:
            backgroundCheckData.restrictivelistrecordsRemarks,
          ConsultationOfLAFTLists: backgroundCheckData.ConsultationOfLAFTLists,
          ConsultationOfLAFTListsRemarks:
            backgroundCheckData.ConsultationOfLAFTListsRemarks,
          ConsultationOfPEPSLists: backgroundCheckData.ConsultationOfPEPSLists,
          ConsultationOfPEPSListsRemarks:
            backgroundCheckData.ConsultationOfPEPSListsRemarks,
          SIMITTrafficInformation: backgroundCheckData.SIMITTrafficInformation,
          SIMITTrafficInformationRemarks:
            backgroundCheckData.SIMITTrafficInformationRemarks,
          RUNTTrafficInformation: backgroundCheckData.RUNTTrafficInformation,
          RUNTTrafficInformationRemarks:
            backgroundCheckData.RUNTTrafficInformationRemarks,
          Adverse: backgroundCheckData.Adverse,
          AdverseRemarks: backgroundCheckData.AdverseRemarks,
          MilitarySituation: backgroundCheckData.MilitarySituation,
          MilitarySituationRemarks:
            backgroundCheckData.MilitarySituationRemarks,
        },
        update: {
          studyId: backgroundCheckData.studyId,
          nationalRegistryofCivilStatus:
            backgroundCheckData.nationalRegistryofCivilStatus,
          nationalRegistryofCivilStatusRemarks:
            backgroundCheckData.nationalRegistryofCivilStatusRemarks,
          nationalAttorneyGeneralsOffice:
            backgroundCheckData.nationalAttorneyGeneralsOffice,
          nationalAttorneyGeneralsOfficeRemarks:
            backgroundCheckData.nationalAttorneyGeneralsOfficeRemarks,
          generalComptrolleroftheNation:
            backgroundCheckData.generalComptrolleroftheNation,
          generalComptrolleroftheNationRemarks:
            backgroundCheckData.generalComptrolleroftheNationRemarks,
          nationalPoliceDisqualifications:
            backgroundCheckData.nationalPoliceDisqualifications,
          nationalPoliceDisqualificationsRemarks:
            backgroundCheckData.nationalPoliceDisqualificationsRemarks,
          NationalRegistrySystemofCorrectiveMeasuresRNMC:
            backgroundCheckData.NationalRegistrySystemofCorrectiveMeasuresRNMC,
          NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks:
            backgroundCheckData.NationalRegistrySystemofCorrectiveMeasuresRNMCRemarks,
          judicialBranch: backgroundCheckData.judicialBranch,
          judicialBranchRemarks: backgroundCheckData.judicialBranchRemarks,
          restrictivelistrecords: backgroundCheckData.restrictivelistrecords,
          restrictivelistrecordsRemarks:
            backgroundCheckData.restrictivelistrecordsRemarks,
          ConsultationOfLAFTLists: backgroundCheckData.ConsultationOfLAFTLists,
          ConsultationOfLAFTListsRemarks:
            backgroundCheckData.ConsultationOfLAFTListsRemarks,
          ConsultationOfPEPSLists: backgroundCheckData.ConsultationOfPEPSLists,
          ConsultationOfPEPSListsRemarks:
            backgroundCheckData.ConsultationOfPEPSListsRemarks,
          SIMITTrafficInformation: backgroundCheckData.SIMITTrafficInformation,
          SIMITTrafficInformationRemarks:
            backgroundCheckData.SIMITTrafficInformationRemarks,
          RUNTTrafficInformation: backgroundCheckData.RUNTTrafficInformation,
          RUNTTrafficInformationRemarks:
            backgroundCheckData.RUNTTrafficInformationRemarks,
          Adverse: backgroundCheckData.Adverse,
          AdverseRemarks: backgroundCheckData.AdverseRemarks,
          MilitarySituation: backgroundCheckData.MilitarySituation,
          MilitarySituationRemarks:
            backgroundCheckData.MilitarySituationRemarks,
        },
      });
      await this.prisma.studyBackgroundCheckResult.upsert({
        where: {
          studyId: backgroundCheckData.studyId,
        },
        create: {
          studyId: backgroundCheckData.studyId,
          concept: backgroundCheckData.concept,
          remarks: backgroundCheckData.remarks,
        },
        update: {
          studyId: backgroundCheckData.studyId,
          concept: backgroundCheckData.concept,
          remarks: backgroundCheckData.remarks,
        },
      });
      const studyProcess = await this.prisma.studies.findFirst({
        where: {
          id: backgroundCheckData.studyId,
        },
      });
      await this.prisma.studies.update({
        where: {
          id: backgroundCheckData.studyId,
        },
        data: {
          AdvantageOfProgress: 100,
          status: StudiesStatus.UNDER_REVIEW,
          dateCompletion:
            studyProcess.dateCompletion === null
              ? new Date()
              : studyProcess.dateCompletion,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: backgroundCheckData.studyId,
            module: FileOperationTypes.BACKGROUND_CHECK_FILE,
            indexFile: 0,
            fileType: file.mimetype,
            name: file.originalname,
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          await this.fileService.loadOperationalFile(
            backgroundCheckData.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudyBackgroundCheckData(studyId: number): Promise<any> {
    try {
      const backgroundCheckData =
        await this.prisma.studyBackgroundCheckData.findFirst({
          where: {
            studyId,
          },
        });
      const backgroundCheckFamilyHistory =
        await this.prisma.studyBackgroundCheckFamilyHistoryData.findMany({
          where: {
            studyId,
          },
        });
      const studyBackgroundCheckResult =
        await this.prisma.studyBackgroundCheckResult.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.BACKGROUND_CHECK_FILE,
        studyId,
      );
      return {
        studyData: backgroundCheckData,
        backgroundCheckFamilyHistory,
        studyBackgroundCheckResult,
        annexes: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadStudyFinancialData(
    financialData: StudyFinancial,
    files: any[],
  ): Promise<string> {
    try {
      await this.prisma.studyFinancialAccounts.deleteMany({
        where: {
          studyId: financialData.studyId,
        },
      });
      await this.prisma.studyFinancialAccounts.createMany({
        data: financialData.studyFinancialAccountsData.map((familyHistory) => {
          return {
            studyId: financialData.studyId,
            entity: familyHistory.entity,
            typeOfAccount: familyHistory.typeOfAccount,
            quality: familyHistory.quality,
            status: familyHistory.status,
            currentBalance: familyHistory.currentBalance,
            rating: familyHistory.rating,
          };
        }),
      });
      await this.prisma.studyFinancialData.deleteMany({
        where: {
          studyId: financialData.studyId,
        },
      });
      await this.prisma.studyFinancialData.createMany({
        data: financialData.studyFinancialData.map((familyHistory) => {
          return {
            studyId: financialData.studyId,
            sectorType: 1,
            entity: familyHistory.entity,
            product: familyHistory.product,
            quota: familyHistory.quota,
            monthlyPayment: familyHistory.monthlyPayment,
            arrears: familyHistory.arrears,
            currentBalance: familyHistory.currentBalance,
            quality: familyHistory.quality,
            behavior: familyHistory.behavior,
          };
        }),
      });
      await this.prisma.studyFinancialResult.upsert({
        where: {
          studyId: financialData.studyId,
        },
        create: {
          studyId: financialData.studyId,
          totalQuota: financialData.totalQuota,
          totalMonthlyPayment: financialData.totalMonthlyPayment,
          totalArrears: financialData.totalArrears,
          totalCurrentBalance: financialData.totalCurrentBalance,
          concept: financialData.concept,
          remarks: financialData.remarks,
        },
        update: {
          studyId: financialData.studyId,
          totalQuota: financialData.totalQuota,
          totalMonthlyPayment: financialData.totalMonthlyPayment,
          totalArrears: financialData.totalArrears,
          totalCurrentBalance: financialData.totalCurrentBalance,
          concept: financialData.concept,
          remarks: financialData.remarks,
        },
      });
      const studyProcess = await this.prisma.studies.findFirst({
        where: {
          id: financialData.studyId,
        },
      });
      await this.prisma.studies.update({
        where: {
          id: financialData.studyId,
        },
        data: {
          AdvantageOfProgress: 100,
          status: StudiesStatus.UNDER_REVIEW,
          dateCompletion:
            studyProcess.dateCompletion === null
              ? new Date()
              : studyProcess.dateCompletion,
        },
      });
      files &&
        files.length > 0 &&
        files.map(async (file: any) => {
          const signFile = {
            studyId: financialData.studyId,
            module: FileOperationTypes.FINANCIAL_FILE,
            indexFile: 0,
            fileType: file.mimetype,
            name: file.originalname,
            size: Number(file.size),
            encoding: file.encoding,
            response: file.buffer,
          };
          await this.fileService.loadOperationalFile(
            financialData.studyId,
            signFile,
            signFile.indexFile,
            this.request.user.id,
          );
        });
      return 'Información guardada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getStudyFinancialData(studyId: number): Promise<any> {
    try {
      const financialData = await this.prisma.studyFinancialData.findMany({
        where: {
          studyId,
        },
      });
      const financialAccounts =
        await this.prisma.studyFinancialAccounts.findMany({
          where: {
            studyId,
          },
        });
      const studyFinancialResult =
        await this.prisma.studyFinancialResult.findFirst({
          where: {
            studyId,
          },
        });
      const fileRows = await this.fileService.getOperationDataFileFromModule(
        FileOperationTypes.FINANCIAL_FILE,
        studyId,
      );
      return {
        studyData: financialData,
        financialAccounts,
        studyFinancialResult,
        annexes: fileRows,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(StudiesService.name);
}
