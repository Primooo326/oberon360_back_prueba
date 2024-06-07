import { Module } from '@nestjs/common';
import { EasyRecognitionService } from './easy-recognition.service';
import { EasyRecognitionController } from './easy-recognition.controller';
import { IcpEmployee } from './entities/icp-employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { OcUser } from 'apps/oberon360-api/src/modules/user/entities/oc-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IcpEmployee], 'ICP'),
    TypeOrmModule.forFeature([OcUser], 'OC'),
  ],
  controllers: [EasyRecognitionController],
  providers: [EasyRecognitionService, JwtStrategy],
})
export class EasyRecognitionModule {}
