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
} from '@nestjs/common';
import { OperationalGroupsService } from './operational-groups.service';
import { ApiTags } from '@nestjs/swagger';
import { OperationalGroupsRequest } from 'apps/oberon360-ic/src/types/Requests';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('parameters/operationalGroups')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Parameters')
export class OperationalGroupsController {
  constructor(
    private readonly operationalGroupsService: OperationalGroupsService,
  ) {}

  @Post('createOperationalGroup')
  async createOperationalGroup(
    @Body() group: OperationalGroupsRequest,
  ): Promise<IResponse> {
    try {
      const responseService = await this.operationalGroupsService.create(group);
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

  @Get('getOperationalGroups')
  async getOperationalGroups(): Promise<IResponse> {
    try {
      const responseService =
        await this.operationalGroupsService.listOperationalGroups();
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

  @Get('getCustomerOperationalGroupByUser/:id')
  async getCustomerOperationalGroupByUser(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.operationalGroupsService.getCustomerOperationalGroupByUser(
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

  @Put('updateOperationalGroup/:id')
  async updateOperationalGroup(
    @Param('id') id: string,
    @Body() operationalGroup: OperationalGroupsRequest,
  ): Promise<IResponse> {
    try {
      const operationalGroupId = Number(id);
      const responseService = await this.operationalGroupsService.edit(
        operationalGroupId,
        operationalGroup,
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

  @Delete('deleteOperationalGroup/:id')
  async deleteOperationalGroup(@Param('id') id: string): Promise<IResponse> {
    try {
      const OperationalGroupId = Number(id);
      const responseService = await this.operationalGroupsService.delete(
        OperationalGroupId,
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
