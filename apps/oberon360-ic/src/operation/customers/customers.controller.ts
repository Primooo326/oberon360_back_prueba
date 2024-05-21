import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerParameters } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import IResponse from '../../types/IResponse';

@Controller('operation/customers')
//@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('getCustomers')
  getCustomers(): Promise<IResponse | null> {
    try {
      const serviceResponse = this.customersService.getCustomersList();
      return serviceResponse;
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getParameterTypes')
  async getParamTypes(): Promise<IResponse | null> {
    try {
      const serviceResponse =
        await this.customersService.getCustomerParamTypes();
      return {
        status: 'success',
        data: serviceResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Post('createParameter')
  async createParameter(
    @Body() param: CustomerParameters,
  ): Promise<IResponse | null> {
    try {
      const serviceResponse = await this.customersService.createNewParam(param);
      return {
        status: 'success',
        data: serviceResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getCustomerInfo/:id')
  async getCustomerInfo(@Param('id') id: String): Promise<IResponse | null> {
    try {
      const serviceResponse = await this.customersService.getCustomerInfo(id);
      return {
        status: 'success',
        data: serviceResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Get('getParameters/:id')
  async getParamsByCustomer(
    @Param('id') id: string,
    @Query('group') group: string,
  ): Promise<IResponse | null> {
    try {
      const serviceResponse =
        await this.customersService.getParamsByGroupInCustomer(
          Number(id),
          Number(group),
        );
      return {
        status: 'success',
        data: serviceResponse,
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
    @Body() param: CustomerParameters,
  ): Promise<IResponse | null> {
    try {
      param.id = Number(id);
      const serviceResponse = await this.customersService.updateParam(param);
      return {
        status: 'success',
        data: serviceResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }

  @Delete('deleteParameter/:id')
  async deleteParameter(@Param('id') id: string): Promise<IResponse | null> {
    try {
      const serviceResponse = await this.customersService.deleteParam(
        Number(id),
      );
      return {
        status: 'success',
        data: serviceResponse,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }
}
