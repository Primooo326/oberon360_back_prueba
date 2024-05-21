import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import IResponse from '../../types/IResponse';

@Controller('operation/parameters')
//@UseGuards(JwtAuthGuard)
@ApiTags('Operation/Parameters')
export class ParametersController {
  constructor(private parametersService: ParametersService) {}

  @Get('getOperationParametersByListId/:id')
  async getOperationParametersByListId(
    @Param('id') id: string,
  ): Promise<IResponse> {
    try {
      const responseService =
        await this.parametersService.getOperationParametersByListId(Number(id));
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
