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
import { DistrictsService } from './districts.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('locations/districts')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Locations')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post('createDistrict')
  async createDistrict(@Body() district: Parameters): Promise<IResponse> {
    try {
      const responseService = await this.districtsService.create(district);
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

  @Get('getDistricts')
  async getDistricts(): Promise<IResponse> {
    try {
      const responseService = await this.districtsService.listDistricts();
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

  @Get('getDistrictsByMunicipality/:id')
  async getDistrictsMunicipality(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService =
        await this.districtsService.getDistrictsByMunicipality(Number(id));
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

  @Get('updateDistrict/:id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() district: Parameters,
  ): Promise<IResponse> {
    try {
      district.id = Number(id);
      const responseService = await this.districtsService.edit(district);
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

  @Post('loadDistricts')
  async loadDistricts(@Body() districts: Parameters[]): Promise<IResponse> {
    try {
      const responseService = await this.districtsService.createMany(districts);
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
