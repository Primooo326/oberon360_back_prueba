import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as dayjs from 'dayjs';
import { Injectable, Logger } from '@nestjs/common';
import {
  BackgroundCheck,
  FamilyInformation,
  GeneralReport,
  PersonalData,
  SecondaryFamilyInformation,
} from './types/GeneralReport';
import { FilesService } from '../../files/files.service';
import { StudiesService } from '../studies/studies.service';
import { generalReportHeader } from '../../files/headers/generalReportHeader';

@Injectable()
export class ReportsService {
  constructor(
    private filesService: FilesService,
    private studiesService: StudiesService,
  ) {}

  async generateReport(
    candidateId: number,
    requestId: number,
    reportType: string,
  ): Promise<any> {
    try {
      const templateHtml = fs.readFileSync(
        path.join(__dirname, `../../../templates/reports/${reportType}.hbs`),
        'utf8',
      );
      const template = handlebars.compile(templateHtml);
      let html = null;
      let candidateInfo = 'Informe';
      const sudiesInfo = await this.studiesService.getAllStudiesFromCandidate(
        candidateId,
        requestId,
      );
      switch (reportType) {
        case 'generalReport':
          const data: GeneralReport = await this.mappedGeneralReport(
            candidateId,
            sudiesInfo,
          );
          candidateInfo =
            candidateInfo + ` General - ${data.personalData.names}`;
          html = template(data);
          break;
        default:
          break;
      }
      const bufferFile = await this.filesService.createPDFFile(
        html,
        generalReportHeader(),
      );
      return { candidateInfo, data: bufferFile };
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async mappedGeneralReport(
    candidateId: number,
    studies: any,
  ): Promise<GeneralReport> {
    try {
      let generalReportData: GeneralReport = {
        personalData: {} as PersonalData,
        backgroundCheck: {} as BackgroundCheck,
        familyInformation: {} as FamilyInformation,
        secondaryFamilyInformation: {} as SecondaryFamilyInformation,
      };
      const personalData = await this.studiesService.getCandidateBasicData(
        candidateId,
      );
      generalReportData.personalData = {
        firstLastName: personalData.firstLastName,
        middleLastName: personalData.middleLastName,
        names: `${personalData.firstName} ${
          personalData.middleName !== 'undefined' ? personalData.middleName : ''
        }`,
        birthDate: dayjs(personalData.birthDate)
          .format('YYYY/MM/DD')
          .toString(),
        birthDepartment: personalData.birthDepartment,
        birthTown: personalData.birthTown,
        RH: personalData.RH,
        height: personalData.height,
        identificationNumber: personalData.identificationNumber,
        documentIssueDate: dayjs(personalData.documentIssueDate)
          .format('YYYY/MM/DD')
          .toString(),
        documentIssuePlace: personalData.documentIssuePlace,
        typeOfPassbook:
          personalData.typeOfPassbook !== 'undefined'
            ? personalData.typeOfPassbook
            : 'N/A',
        militaryDistrict:
          personalData.militaryDistrict !== 'undefined'
            ? personalData.militaryDistrict
            : 'N/A',
        militaryPassbookNumber:
          personalData.militaryPassbookNumber !== 'undefined'
            ? personalData.militaryPassbookNumber
            : 'N/A',
        particularSigns: `${personalData.bodyMarkings} ${personalData.locationBodyMarkings}`,
        residenceAddress: personalData.residenceAddress,
        cityResidence: personalData.cityResidence,
        district: personalData.district,
        phone: personalData.phone !== 'undefined' ? personalData.phone : '--',
        childrenNumber: personalData.childrenNumber,
        cellPhone: personalData.cellPhone,
        maritalStatus: personalData.maritalStatus,
      };
      const familyData = await this.studiesService.getFamilyData(candidateId);
      generalReportData.familyInformation = {
        mothersName: familyData.parentsData.motherName,
        mothersAge:
          familyData.parentsData.motherAge !== null
            ? familyData.parentsData.motherAge
            : '--',
        addressMother:
          familyData.parentsData.motherAdrress !== null
            ? familyData.parentsData.motherAdrress
            : '--',
        mothersLivingStatus:
          familyData.parentsData.motherLives === true ? 'VIVO' : 'FALLECIDO',
        motherLivesWith:
          familyData.parentsData.motherLivesWith === true ? 'SI' : 'NO',
        mothersLandline:
          familyData.parentsData.motherPhone !== null
            ? familyData.parentsData.motherPhone
            : '--',
        mothersMobilePhone:
          familyData.parentsData.motherCellPhone !== null
            ? familyData.parentsData.motherCellPhone
            : '--',
        professionMother:
          familyData.parentsData.motherProfession !== null
            ? familyData.parentsData.motherProfession
            : '--',
        fathersName: familyData.parentsData.fatherName,
        fathersAge:
          familyData.parentsData.fatherAge !== null
            ? familyData.parentsData.fatherAge
            : '--',
        addressFather:
          familyData.parentsData.fatherAdrress !== null
            ? familyData.parentsData.fatherAdrress
            : '--',
        livingStatusFather:
          familyData.parentsData.fatherLives === true ? 'VIVO' : 'FALLECIDO',
        fatherLivesWith:
          familyData.parentsData.fatherLivesWith === true ? 'SI' : 'NO',
        fathersLandline:
          familyData.parentsData.fatherPhone !== null
            ? familyData.parentsData.fatherPhone
            : '--',
        fathersMobilePhone:
          familyData.parentsData.fatherCellPhone !== null
            ? familyData.parentsData.fatherCellPhone
            : '--',
        professionFather:
          familyData.parentsData.fatherProfession !== null
            ? familyData.parentsData.fatherProfession
            : '--',
        familyInformationSiblings:
          familyData.siblingsData && familyData.siblingsData.length > 0
            ? familyData.siblingsData.map((sibling: any) => {
                return {
                  fullNames: sibling.fullName ? sibling.fullName : 'N/A',
                  profession: sibling.profession,
                  address: sibling.address,
                  mobile: sibling.phone,
                };
              })
            : [],
      };
      const validateBackgroundCheckStudy = studies.find(
        (study) => study.studyTypeId === 3,
      );
      if (validateBackgroundCheckStudy) {
        const backgroundCheckData =
          await this.studiesService.getStudyBackgroundCheckData(
            validateBackgroundCheckStudy.id,
          );
        generalReportData.backgroundCheck = backgroundCheckData;
      }
      const secondaryFamilyData =
        await this.studiesService.getFamilySecondaryData(candidateId);
      secondaryFamilyData.length > 0 &&
        (generalReportData.secondaryFamilyInformation = {
          fullName:
            secondaryFamilyData.spouseData &&
            secondaryFamilyData.spouseData.fullName
              ? secondaryFamilyData.spouseData.fullName
              : 'N/A',
          identificationNumber:
            secondaryFamilyData.spouseData.identificationNumber,
          birthDate: dayjs(secondaryFamilyData.spouseData.birthDate)
            .format('YYYY/MM/DD')
            .toString(),
          birthDepartment: secondaryFamilyData.spouseData.birthDepartment,
          birthTown: secondaryFamilyData.spouseData.birthTown,
          yearsOfAcquaintances:
            secondaryFamilyData.spouseData.yearsOfAcquaintances,
          age: secondaryFamilyData.spouseData.age,
          phoneNumber:
            secondaryFamilyData.spouseData.phoneNumber !== 'undefined'
              ? secondaryFamilyData.spouseData.phoneNumber
              : '--',
          cellPhoneNumber: secondaryFamilyData.spouseData.cellPhoneNumber,
          profession: secondaryFamilyData.spouseData.profession,
          informationChildren: [],
          cohabitantsInformation:
            secondaryFamilyData.peopleWithLiveData.length > 0
              ? secondaryFamilyData.peopleWithLiveData
              : [],
        });
      return generalReportData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(ReportsService.name);
}
