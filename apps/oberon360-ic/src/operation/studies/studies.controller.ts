import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Get,
  UseGuards,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import {
  Programmes,
  Studies,
  StudyVisitDomiciliaryRemarks,
} from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import IResponse from '../../types/IResponse';
import { StudyBackgroundCheck, StudyFinancial, StudyReferencingAcademic, StudyReferencingEmployment, StudyReferencingReferences } from '../../types/StudiesDataRequest';
import { EconomicIncomeData, FamilyData, HousingData, VisitDomiciliaryConcept } from '../../types/CustomEntities';

@Controller('operation/studies')
@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post('createStudy')
  async createStudy(@Body() study: Studies): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.create(study);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudies')
  async getStudies(): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.list();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudiesFromCandidate/:id')
  async getStudiesFromCandidate(
    @Param('id') id: string,
    @Query('requestId') requestId: string,
  ): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getStudiesFromCandidate(
        Number(id),
        Number(requestId),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudiesFromRequests')
  async getStudiesFromRequests(): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getStudiesFromRequest();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('assignToAnalyst')
  async assignToAnalyst(@Body() body: any): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.assignToAnalyst(
        body.studyId,
        body.analystId,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('updateStudy/:id')
  async updateStudy(
    @Param() id: string,
    @Body() study: Studies,
  ): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.update(
        Number(id),
        study,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('scheduleService')
  async scheduleService(@Body() event: Programmes): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.scheduleService(event);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudyTypesFromServices')
  async getStudyTypesFromServices(): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getStudyTypesFromServices();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  // Data to studies

  @Get('getCandidateFiles/:id')
  async getCandidateFiles(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getCandidateFiles(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getCandidateBasicData/:id')
  async getCandidateBasicData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getCandidateBasicData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadCandidateEmploymentStudyData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadCandidateEmploymentStudyData(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadCandidateEmploymentStudyData(
          JSON.parse(body.studyData) as StudyReferencingEmployment,
          files.file,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getCandidateEmploymentStudyData/:id')
  async getCandidateEmploymentStudyData(
    @Param('id') id: string,
    @Query('studyId') studyId: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getCandidateEmploymentStudyData(
          Number(studyId),
          Number(id),
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadCandidateAcademicStudyData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadCandidateAcademicStudyData(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadCandidateAcademicStudyData(
          JSON.parse(body.studyData) as StudyReferencingAcademic,
          files.file,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getCandidateAcademicData/:id')
  async getCandidateAcademicData(
    @Param('id') id: string,
    @Query('studyId') studyId: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getCandidateAcademicData(
          Number(studyId),
          Number(id),
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadCandidateReferencesStudyData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadCandidateReferencesStudyData(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadCandidateReferencesStudyData(
          JSON.parse(body.studyData) as StudyReferencingReferences,
          files.file,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getCandidateReferencesData/:id')
  async getCandidateReferencesData(
    @Param('id') id: string,
    @Query('studyId') studyId: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getCandidateReferencesData(
          Number(studyId),
          Number(id),
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getFamilyData/:id')
  async getFamilyData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getFamilyData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getFamilySecondaryData/:id')
  async getFamilySecondaryData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getFamilySecondaryData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getEmploymentData/:id')
  async getEmploymentData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getEmploymentData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getAcademicData/:id')
  async getAcademicData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getAcademicData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getVisitDomicilaryRemarks/:id')
  async getVisitDomicilaryRemarks(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getVisitDomicilaryRemarks(Number(id));
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadVisitDomicilaryRemarks')
  async loadVisitDomicilaryRemarks(
    @Body() body: StudyVisitDomiciliaryRemarks,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadVisitDomicilaryRemarks(body);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getHousingData/:id')
  async getHousingData(
    @Param('id') id: string,
    @Query('candidateId') candidateId: string,
  ): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getHousingData(
        Number(id),
        Number(candidateId),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadHousingData')
  async loadHousingData(@Body() body: HousingData): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.loadHousingData(body);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getEconomicIncomeData/:id')
  async getEconomicIncomeData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getEconomicIncomeData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadEconomicIncomeData')
  async loadEconomicIncomeData(
    @Body() body: EconomicIncomeData,
  ): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.loadEconomicIncomeData(
        body,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadVisitDomicilaryConcept')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadVisitDomicilaryConcept(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const conceptStudyData = {
        studyId: Number(body.studyId),
        concept: {
          descriptionPhotographicRecord: body.descriptionPhotographicRecord,
          remarks: body.remarks,
          conceptOfVisit: body.conceptOfVisit,
        },
      } as VisitDomiciliaryConcept;
      const responseService =
        await this.studiesService.loadVisitDomicilaryConcept(
          conceptStudyData,
          files.file,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getVisitDomicilaryConcept/:id')
  async getVisitDomicilaryConcept(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getVisitDomicilaryConcept(Number(id));
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadVisitDomiciliaryReferencingData')
  async loadVisitDomiciliaryReferencingData(
    @Body() body: any,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadVisitDomiciliaryReferencingData(
          body.studyId,
          body.referencingRemark,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getSecondaryStudyFamilyData/:id')
  async getSecondaryStudyFamilyData(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getSecondaryStudyFamilyData(Number(id));
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadSecondaryFamilyData')
  async loadSecondaryFamilyData(@Body() body: FamilyData): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.loadSecondaryFamilyData(
        body,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudyFamilyData/:id')
  async getStudyFamilyData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getStudyFamilyData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadFamilyData')
  async loadFamilyData(@Body() body: FamilyData): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.loadFamilyData(body);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadStudyBackgroundCheckData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadStudyBackgroundCheckData(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.loadStudyBackgroundCheckData(
          JSON.parse(body.studyData) as StudyBackgroundCheck,
          files.file,
        );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudyBackgroundCheckData/:id')
  async getStudyBackgroundCheckData(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.studiesService.getStudyBackgroundCheckData(Number(id));
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('loadStudyFinancialData')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 10 }]))
  async loadStudyFinancialData(
    @Body() body: any,
    @UploadedFiles() files: any,
  ): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.loadStudyFinancialData(
        JSON.parse(body.studyData) as StudyFinancial,
        files.file,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getStudyFinancialData/:id')
  async getStudyFinancialData(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.studiesService.getStudyFinancialData(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }
}
