import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import IResponse from '../../types/IResponse';

@Controller('core/modules')
@UseGuards(JwtAuthGuard)
@ApiTags('Core/Modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get('getModules')
  async getModules(): Promise<IResponse> {
    try {
      const responseService = await this.modulesService.getModules();
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
