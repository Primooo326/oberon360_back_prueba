import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ParameterValueType } from '@prisma/client';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('parameters/types')
//@UseGuards(JwtAuthGuard)
@ApiTags('System/Parameters')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post('create')
  async createParameterType(
    @Body() type: ParameterValueType,
  ): Promise<IResponse> {
    try {
      const responseService = await this.typesService.create(type);
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

  @Get('list')
  async getParameterTypes(): Promise<IResponse> {
    try {
      const responseService = await this.typesService.listParameterTypes();
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

  @Post('load')
  async createManyParameterTypes(
    @Body() types: ParameterValueType[],
  ): Promise<IResponse> {
    try {
      const responseService = await this.typesService.createMany(types);
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
