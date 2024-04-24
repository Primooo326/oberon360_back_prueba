import {
  Controller,
  Get,
  Res,
  Query,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('generateReport')
  async testGenerateFile(
    @Res() res: Response,
    @Query()
    query: { candidateId: string; reportType: string; requestId: string },
  ): Promise<any> {
    try {
      const responseService = await this.reportsService.generateReport(
        Number(query.candidateId),
        Number(query.requestId),
        query.reportType,
      );
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${responseService.candidateInfo}.pdf`,
      });
      res.send(responseService.data);
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }
}
