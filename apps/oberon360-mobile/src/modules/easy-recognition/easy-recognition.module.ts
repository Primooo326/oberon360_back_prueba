import { Module } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { EasyRecognitionController } from './easy-recognition.controller';
import { IcpEmployee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcUser } from 'apps/oberon360-api/src/modules/user/entities/user.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([IcpEmployee], 'ICP'),
    TypeOrmModule.forFeature([OcUser], 'OC'),
  ],
  controllers: [EasyRecognitionController],
  providers: [EasyRecognitionService, JwtStrategy],
})
export class EasyRecognitionModule {}
