import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersCreationRequest } from '../../types/Requests';
import IResponse from '../../types/IResponse';
import { User } from '@prisma/client';

@Controller('core/users')
@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  @UseInterceptors(FileInterceptor('file'))
  async createUser(
    @Body() user: UsersCreationRequest,
    @UploadedFile() file: any,
  ): Promise<IResponse> {
    try {
      const responseService = await this.usersService.create(user, file);
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

  @Get('getUsers')
  async getUsers(): Promise<IResponse> {
    try {
      const responseService = await this.usersService.listUsers();
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

  @Put('updatePassword')
  async updateUserPassword(@Body() body: any): Promise<IResponse> {
    try {
      const responseService = await this.usersService.updatePassword({
        currentPassword: body.currentPassword,
        password: body.password,
      });
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

  @Put('updateUser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<IResponse> {
    try {
      const responseService = await this.usersService.updateUser(
        Number(id),
        user,
      );
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

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.usersService.deleteUser(Number(id));
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
