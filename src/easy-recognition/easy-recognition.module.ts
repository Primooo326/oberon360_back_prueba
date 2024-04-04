import { Module } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { EasyRecognitionController } from './easy-recognition.controller';

@Module({
  controllers: [EasyRecognitionController],
  providers: [EasyRecognitionService],
})
export class EasyRecognitionModule {}
