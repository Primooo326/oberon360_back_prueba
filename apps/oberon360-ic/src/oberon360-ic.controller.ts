import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('multer')
@ApiTags('Core/Utils')
export class Oberon360IcController {
  @Post('process')
  async createParameter(): Promise<any> {
    return {
      status: 'success',
      data: 'Archivo en proceso de cargue',
    };
  }
}