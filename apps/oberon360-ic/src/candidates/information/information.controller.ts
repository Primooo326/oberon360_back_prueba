import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Body,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { InformationService } from './information.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { UtilsService } from '../../utils/utils.service';
import { FilesService } from '../../files/files.service';
import IResponse from '../../types/IResponse';
import { FileTypes } from '../../types/FileTypes';
import { AcademicAndEmploymentData, IParentsAndSiblingsData, PeopleLivesAndHousingData, PeopleLivesAndHousingDataSelect } from '../../types/CustomEntities';
import { CandidateSpouseAndInlawData } from '@prisma/client';

@Controller('candidates/information')
@UseGuards(JwtAuthGuard)
@ApiTags('Candidates/Information')
export class InformationController {
  constructor(
    private prisma: UtilsService,
    private readonly InformationService: InformationService,
    private readonly fileService: FilesService,
  ) {}

  @Post('loadBasicData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadBasicDataUserInformation(
    @Body() userBasicData: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService = await this.InformationService.loadBasicData(
        userBasicData,
        files.file,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getBasicData')
  async getBasicDataUserInformation(): Promise<IResponse> {
    try {
      const responseService = await this.InformationService.getBasicDataUser();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('loadAcademicAndEmploymentData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadAcademicAndEmploymentData(
    @Body() body: any,
    @UploadedFiles() files: any,
    @Req() req: any,
  ): Promise<IResponse> {
    try {
      const academicAndEmploymentData = JSON.parse(body.data);
      return Promise.all([
        await this.InformationService.loadAcademicData(
          academicAndEmploymentData.candidateAcademicData,
        ),
        await this.InformationService.loadEmploymentData(
          academicAndEmploymentData.candidateEmploymentData,
        ),
        files.file &&
          files.file.length > 0 &&
          files.file.map(async (file: any) => {
            const signFile = {
              name: file.originalname.split('###')[2],
              response: file.buffer,
              size: Number(file.size),
              type: file.mimetype,
              encoding: file.encoding,
              module: 'users',
              fileType: FileTypes[file.originalname.split('###')[1]],
              userEntityId: req.user.id,
              fileIndex: Number(file.originalname.split('###')[0]),
            };
            const responsefileService = await this.fileService.loadFile(
              signFile,
              req.user.id,
            );
            await this.prisma.candidateFiles.create({
              data: {
                candidateId: req.user.id,
                fileType: signFile.fileType,
                fileMongoPath: responsefileService._id,
                fileIndex: signFile.fileIndex,
              },
            });
          }),
        await this.prisma.candidateProcessStatus.upsert({
          where: {
            candidateId: req.user.id,
          },
          update: {
            academicAndEmploymentData: 'SUCCESS',
          },
          create: {
            candidateId: req.user.id,
            academicAndEmploymentData: 'SUCCESS',
          },
        }),
      ])
        .then(() => {
          return {
            status: 'success',
            data: 'Datos academicos e información laboral cargados',
          };
        })
        .catch((error) => {
          throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message ? error.message : error,
          });
        });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getAcademicAndEmploymentData')
  async getAcademicAndEmploymentData(): Promise<IResponse> {
    try {
      const candidateAcademicData =
        await this.InformationService.getAcademicDataUser();
      const candidateEmploymentData =
        await this.InformationService.getEmploymentDataUser();
      const responseService: AcademicAndEmploymentData = {
        candidateAcademicData,
        candidateEmploymentData,
      };
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('loadParentsAndSiblingsData')
  async loadParentsAndSiblingsData(
    @Body() parentsAndSiblingsData: IParentsAndSiblingsData,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.loadParentsAndSiblingsData(
          parentsAndSiblingsData,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getParentsAndSiblingsData')
  async getParentsAndSiblingsData(): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.getParentsAndSiblingsDataUser();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('loadSpouseAndParentsInlawData')
  async loadSpouseAndInlawDataUserInformation(
    @Body() userSpouseInLawData: CandidateSpouseAndInlawData,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.loadSpouseAndInlawData(
          userSpouseInLawData,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      });
    }
  }

  @Get('getSpouseInlawData')
  async getSpouseAndInlawDataUserInformation(): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.getSpouseAndInlawDataUser();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('loadPeopleWithlivesAndHousingData')
  async loadPeopleWithlivesAndHousingData(
    @Body() peopleLivesAndHousingData: PeopleLivesAndHousingData,
    @Req() req: any,
  ): Promise<IResponse> {
    try {
      return Promise.all([
        await this.InformationService.loadHousingData(
          peopleLivesAndHousingData.housingData,
        ),
        await this.InformationService.loadPeopleData(
          peopleLivesAndHousingData.peopleInformation,
        ),
        await this.prisma.candidateProcessStatus.upsert({
          where: {
            candidateId: req.user.id,
          },
          update: {
            peopleWithLivesData: 'SUCCESS',
          },
          create: {
            candidateId: req.user.id,
            peopleWithLivesData: 'SUCCESS',
          },
        }),
      ])
        .then(() => {
          return {
            status: 'success',
            data: 'Datos vivienda y personas con las que vive cargados',
          };
        })
        .catch((error) => {
          throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message ? error.message : error,
          });
        });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getPeopleWithlivesAndHousingData')
  async getPeopleWithlivesAndHousingData(): Promise<IResponse> {
    try {
      const housingData = await this.InformationService.getHousingData();
      const peopleInformation =
        await this.InformationService.getPeopleWithLives();
      const responseService: PeopleLivesAndHousingDataSelect = {
        ...housingData,
        peopleNumber: peopleInformation.length,
        peopleInformation,
      };
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('loadReferencesData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadReferencesDataUserInformation(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService = await this.InformationService.loadReferencesData(
        JSON.parse(body.data),
        files.file,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      });
    }
  }

  @Get('getReferencesData')
  async getReferencesDataUserInformation(): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.getReferencesDataUser();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getProcessCandidate')
  async getProcessCandidate(): Promise<IResponse> {
    try {
      const responseService = await this.InformationService.getStatusProcess();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('CompleteCandidateProcess')
  async CompleteCandidateProcess(): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.completeCandidateProcess();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getStudiesScheduled')
  async getStudiesScheduled(): Promise<IResponse> {
    try {
      const responseService =
        await this.InformationService.getStudiesScheduled();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getCandidateFiles')
  async getCandidateFiles(): Promise<IResponse> {
    try {
      const responseService = await this.InformationService.getCandidateFiles();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }
}
