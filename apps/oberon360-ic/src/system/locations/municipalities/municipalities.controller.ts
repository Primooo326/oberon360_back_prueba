import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('locations/municipalities')
//@UseGuards(JwtAuthGuard)
@ApiTags('System/Locations')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Post('createMunicipality')
  async createMunicipality(
    @Body() municipality: Parameters,
  ): Promise<IResponse> {
    try {
      const responseService = await this.municipalitiesService.create(
        municipality,
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

  @Get('getMunicipalities')
  async getMunicipalities(): Promise<IResponse> {
    try {
      const responseService =
        await this.municipalitiesService.listMunicipalities();
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

  @Get('getMunicipalitiesByDepartment/:id')
  async getMunicipalitiesByDepartment(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.municipalitiesService.getMunicipalitiesByDepartmentId(
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

  @Get('getMunicipalitiesByCountry/:id')
  async getMunicipalitiesByCountry(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.municipalitiesService.getMunicipalitiesByCountryId(
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

  @Get('updateMunicipality/:id')
  async updateMunicipality(
    @Param('id') id: string,
    @Body() municipality: Parameters,
  ): Promise<IResponse> {
    try {
      municipality.id = Number(id);
      const responseService = await this.municipalitiesService.edit(
        municipality,
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

  @Post('loadMunicipalities')
  async loadMunicipalities(
    @Body() municipalities: Parameters[],
  ): Promise<IResponse> {
    try {
      const responseService = await this.municipalitiesService.createMany(
        municipalities,
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
}
