import {
  Body,
  Controller,
  Get,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UseGuards,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from '../../types/IResponse';

@Controller('parameters')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Post('createParameter')
  async createParameter(@Body() parameter: Parameters): Promise<IResponse> {
    try {
      const responseService = await this.parametersService.create(parameter);
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

  @Get('getParameters')
  async getParameters(): Promise<IResponse> {
    try {
      const responseService = await this.parametersService.listParameters();
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

  @Get('getParametersByGroup/:id')
  async getParametersByGroup(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.parametersService.getParametersByGroup(
        Number(id),
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

  @Get('getParametersByGroupAndOrderFather/:id')
  async getParametersByGroupAndOrderFather(
    @Param('id') id: string,
    @Query('fatherId') fatherId: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.parametersService.getParametersByGroupSegmentByFather(
          Number(id),
          Number(fatherId),
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

  @Put('updateParameter/:id')
  async updateParameter(
    @Param('id') id: string,
    @Body() parameter: Parameters,
  ): Promise<IResponse> {
    try {
      const parameterId = Number(id);
      const responseService = await this.parametersService.edit(
        parameterId,
        parameter,
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

  @Post('loadParameters')
  async loadParameters(@Body() parameters: Parameters[]): Promise<IResponse> {
    try {
      const responseService = await this.parametersService.createMany(
        parameters,
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

  @Delete('deleteParameter/:id')
  async deleteParameter(@Param('id') id: string): Promise<IResponse> {
    try {
      const parameterId = Number(id);
      const responseService = await this.parametersService.delete(parameterId);
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
