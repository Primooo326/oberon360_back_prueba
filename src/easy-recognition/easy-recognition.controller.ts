import { Body, Controller, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { ValidateEasyRecognitionDto } from './dto/validate-easy-recognition.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('easy-recognition')
@UseGuards(JwtAuthGuard)
@Controller('api/easy-recognition')
export class EasyRecognitionController {
  constructor(private readonly easyRecognitionService: EasyRecognitionService) {}

  @HttpCode(200)
  @Post('validate')
  loginUser(@Body() validateEasyRecognitionDto: ValidateEasyRecognitionDto) {
    return this.easyRecognitionService.validate(validateEasyRecognitionDto);
  }
}
