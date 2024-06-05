import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { DownloadExcelDto } from '../../dtos-globals/download.excel.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('excel')
@UseGuards(JwtAuthGuard)
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('downloadExcel')
  async downloadExcel(@Body() dto: DownloadExcelDto, @Res() res: Response) {
    const filePath = await this.excelService.downloadExcel(dto);
    res.download(filePath, 'data.xlsx', (err) => {
      if (err) {
        res.status(500).send({
          message: 'Error downloading file',
        });
      }
    });
  }
}
