import { Body, Controller, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { ValidateEasyRecognitionDto } from './dto/validate-easy-recognition.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmotionsEasyRecognitionDto } from './dto/emotions-easy-recognition.dto';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('easy-recognition')
//@UseGuards(JwtAuthGuard)
@Controller('oberon360mobile/api/easy-recognition')
export class EasyRecognitionController {
  constructor(private readonly easyRecognitionService: EasyRecognitionService) {}

  @HttpCode(200)
  @Post('validateAuthentication')
  validateAuthentication(@Body() validateEasyRecognitionDto: ValidateEasyRecognitionDto, @Request() req) {
    return this.easyRecognitionService.validateAuthentication(validateEasyRecognitionDto, req.user);
  }

  @HttpCode(200)
  @Post('emotionsEasyRecognition')
  emotionsEasyRecognition(@Body() emotionsEasyRecognitionDto: EmotionsEasyRecognitionDto) {
    return this.easyRecognitionService.emotionsEasyRecognition(emotionsEasyRecognitionDto);
  }
}