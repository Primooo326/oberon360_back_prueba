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
import { DepartmentsService } from './departments.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('locations/departments')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Locations')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('createDepartment')
  async createDepartment(@Body() department: Parameters): Promise<IResponse> {
    try {
      const responseService = await this.departmentsService.create(department);
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

  @Get('getDepartments')
  async getDepartments(): Promise<IResponse> {
    try {
      const responseService = await this.departmentsService.listDepartments();
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

  @Get('getDepartmentsByCountry/:id')
  async getDepartmentsByCountry(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService =
        await this.departmentsService.getDepartmentsByCountry(Number(id));
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

  @Get('updateDepartment/:id')
  async updateDepartment(
    @Param('id') id: string,
    @Body() department: Parameters,
  ): Promise<IResponse> {
    try {
      department.id = Number(id);
      const responseService = await this.departmentsService.edit(department);
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

  @Post('loadDepartments')
  async loadDepartments(@Body() departments: Parameters[]): Promise<IResponse> {
    try {
      const responseService = await this.departmentsService.createMany(
        departments,
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
