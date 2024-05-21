import * as ExcelJS from 'exceljs';
import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Get,
  Delete,
  UseGuards,
  UploadedFile,
  Param,
  Res,
  UseInterceptors,
  Request,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestService } from './request.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { RequestCustom } from '../../types/Requests';
import IResponse from '../../types/IResponse';
import { ParametersService } from '../../system/parameters/parameters.service';

@Controller('operation/request')
//@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private parametersService: ParametersService,
  ) {}

  @Post('createRequest')
  async createRequest(@Body() request: RequestCustom): Promise<IResponse> {
    try {
      const responseService = await this.requestService.create(request);
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

  @Get('getRequests')
  async getRequests(): Promise<IResponse> {
    try {
      const responseService = await this.requestService.list();
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

  @Post('submitRequest/:id')
  async submitRequest(
    @Param('id') id: string,
    @Query('customerId') customerId: String,
  ): Promise<IResponse> {
    try {
      const responseService = await this.requestService.submitRequest(
        Number(id),
        Number(customerId),
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

  @Delete('deleteRequest/:id')
  async deleteRequest(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.requestService.delete(Number(id));
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

  @Get('downloadTemplate')
  async generarPlantilla(@Res() res: Response) {
    try {
      const listTypes = await this.parametersService.getParametersByGroup(1);
      const options = listTypes.map((parameter) => parameter.value).join(',');
      // Crea un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Candidatos');
      worksheet.columns = this.templateColumns;
      // Agrega la lista desplegable en la columna "Tipo de identificacion"
      for (let i = 1; i <= 200; i++) {
        const tipoIdentificacionCell = worksheet.getCell(`B${i}`);
        tipoIdentificacionCell.dataValidation = {
          type: 'list',
          formulae: [`"${options}"`],
        };
      }
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=plantilla.xlsx',
      );
      res.setHeader('Content-Length', 0); // Deja que Express calcule el tamaño
      // Escribe el libro de Excel en un flujo
      const stream = await workbook.xlsx.writeBuffer();
      res.send(stream);
      res.end();
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Post('bulkUpload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEvidences(
    @Body() body: any,
    @UploadedFile() file: any,
    @Request() req: any,
  ): Promise<any> {
    try {
      if (!file) {
        throw new InternalServerErrorException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Se debe cargar la plantilla',
        });
      } else {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.buffer);
        const worksheet = workbook.worksheets[0];
        const data = [];
        worksheet.eachRow((row) => {
          const rowData: any = {};
          row.eachCell((cell, colNumber) => {
            rowData[this.templateColumns[colNumber - 1].key] = cell.value;
          });
          data.push(rowData);
        });
        data.shift();
        const mappedList = await Promise.resolve(
          data.map((item) => {
            return {
              name: item.name,
              username: String(item.identification),
              customerId: req.user.customerId,
              charge: item.charge,
              email: item.email.text,
              phone: item.phone,
            };
          }),
        );
        const requestToGenerate = {
          customerId: req.user.customerId,
          customerInternal: Number(body.customerInternal),
          costCenterId: Number(body.costCenterId),
          regional: Number(body.regional),
          billable: Boolean(body.billable === 'true' ? true : false),
          remarks: body.remarks,
          saveType: body.saveType,
          services: JSON.parse(body.services),
          candidates: mappedList,
        };
        const responseService = await this.requestService.create(
          requestToGenerate,
        );
        return {
          status: 'success',
          data: responseService,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  private templateColumns = [
    { header: 'Nombre', key: 'name', width: 20 },
    {
      header: 'Tipo de identificacion',
      key: 'identificacionType',
      width: 20,
    },
    { header: 'N° Identificacion', key: 'identification', width: 20 },
    { header: 'Cargo', key: 'chargue', width: 20 },
    { header: 'Correo', key: 'email', width: 20 },
    { header: 'Telefono', key: 'phone', width: 20 },
  ];
}
