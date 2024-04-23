import { Module } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { EasyRecognitionController } from './easy-recognition.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/oberon360-api/src/modules/user/entities/user.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee], 'ICP'),
    TypeOrmModule.forFeature([User], 'OC'),
  ],
  controllers: [EasyRecognitionController],
  providers: [EasyRecognitionService, JwtStrategy],
})
export class EasyRecognitionModule {}
