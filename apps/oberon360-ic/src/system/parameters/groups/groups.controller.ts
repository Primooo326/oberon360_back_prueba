import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import IResponse from 'apps/oberon360-ic/src/types/IResponse';

@Controller('parameters/groups')
@UseGuards(JwtAuthGuard)
@ApiTags('System/Parameters')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('list')
  async getParameterGroups(): Promise<IResponse> {
    try {
      const responseService = await this.groupsService.listParameterGroups();
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
