import { Module } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { EasyRecognitionController } from './easy-recognition.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee], 'ICP'),
    TypeOrmModule.forFeature([User], 'OC'),
  ],
  controllers: [EasyRecognitionController],
  providers: [EasyRecognitionService, JwtStrategy],
})
export class EasyRecognitionModule {}
