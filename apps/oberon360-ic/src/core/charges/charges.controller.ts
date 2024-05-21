import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  InternalServerErrorException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ChargesService } from './charges.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Parameters } from '@prisma/client';
import IResponse from '../../types/IResponse';

@Controller('core/charges')
//@UseGuards(JwtAuthGuard)
@ApiTags('Core/Charges')
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post('createCharge')
  async createCharge(@Body() user: Parameters): Promise<IResponse> {
    try {
      const responseService = await this.chargesService.create(user);
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

  @Get('getCharges')
  async getCharges(): Promise<IResponse> {
    try {
      const responseService = await this.chargesService.listCharges();
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

  @Get('getChargeById/:id')
  async getChargeById(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.chargesService.getById(Number(id));
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

  @Put('updateCharge/:id')
  async updateCharge(
    @Param() id: number,
    @Body() body: any,
  ): Promise<IResponse> {
    try {
      const chargeData: Parameters = body;
      chargeData.id = id;
      const responseService = await this.chargesService.update(chargeData);
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
}
