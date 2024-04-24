import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
  HttpStatus,
  Header,
  Response,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Types } from 'mongoose';
import { Response as ResExpress } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Core/Utils')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('getFile/:id')
  @Header('Cache-Control', 'none')
  async getFile(
    @Param('id') id: string,
    @Response() res: ResExpress,
  ): Promise<ResExpress> {
    try {
      const responseService = await this.filesService.getDataFile(
        new Types.ObjectId(id),
      );
      if (!responseService) {
        res.status(404).send('File not found');
        return;
      }
      res.header('Content-Type', responseService.mimeType);
      const disposition = `inline; filename=${encodeURIComponent(
        responseService.fileName,
      )}`;
      res.header('Content-Disposition', disposition);
      const fileBuffer = Buffer.from(responseService.data, 'base64');
      res.send(fileBuffer);
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('operation/getFile/:id')
  @Header('Cache-Control', 'none')
  async getOperationDataFile(
    @Param('id') id: string,
    @Response() res: ResExpress,
  ): Promise<ResExpress> {
    try {
      const responseService = await this.filesService.getOperationDataFile(
        new Types.ObjectId(id),
      );
      if (!responseService) {
        res.status(404).send('File not found');
        return;
      }
      res.header('Content-Type', responseService.type);
      const disposition = `inline; filename=${encodeURIComponent(
        responseService.name,
      )}`;
      res.header('Content-Disposition', disposition);
      const fileBuffer = Buffer.from(responseService.data, 'base64');
      res.send(fileBuffer);
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }
}
