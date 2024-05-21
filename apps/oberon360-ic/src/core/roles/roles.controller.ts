import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
  Body,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesCreationRequest } from '../../types/Requests';
import IResponse from '../../types/IResponse';

@Controller('core/roles')
//@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('createRole')
  async createRole(@Body() user: RolesCreationRequest): Promise<IResponse> {
    try {
      const responseService = await this.rolesService.create(user);
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

  @Get('getRoles')
  async getRoles(): Promise<IResponse> {
    try {
      const responseService = await this.rolesService.listRoles();
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

  @Get('getRoleById/:id')
  async getRoleById(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.rolesService.getById(Number(id));
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

  @Put('updateRole/:id')
  async updateRole(
    @Param('id') id: number,
    @Body() role: any,
  ): Promise<IResponse> {
    try {
      const responseService = await this.rolesService.update(Number(id), role);
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

  @Delete('deleteRole/:id')
  async deleteRole(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.rolesService.delete(Number(id));
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
