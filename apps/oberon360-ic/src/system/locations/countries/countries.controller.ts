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
import { CountriesService } from './countries.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('locations/countries')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Locations')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post('createCountry')
  async createCountry(@Body() country: Parameters): Promise<IResponse> {
    try {
      const responseService = await this.countriesService.create(country);
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

  @Get('getCountries')
  async getCountries(): Promise<IResponse> {
    try {
      const responseService = await this.countriesService.listCountries();
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

  @Get('updateCountry/:id')
  async updateCountry(
    @Param('id') id: string,
    @Body() country: Parameters,
  ): Promise<IResponse> {
    try {
      country.id = Number(id);
      const responseService = await this.countriesService.edit(country);
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

  @Post('loadCountries')
  async loadCountries(@Body() countries: Parameters[]): Promise<IResponse> {
    try {
      const responseService = await this.countriesService.createMany(countries);
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
