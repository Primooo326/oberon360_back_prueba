import { Module } from '@nestjs/common';
import { ProtocolResponsibleService } from './protocol-responsible.service';
import { ProtocolResponsibleController } from './protocol-responsible.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapProtocolResponsible } from './entities/map-protocol-responsible.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { MapProtocol } from '../protocol/entities/map-protocol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapProtocolResponsible, MapProtocol], 'MAP'),
  ],
  controllers: [ProtocolResponsibleController],
  providers: [ProtocolResponsibleService, JwtStrategy],
})
export class ProtocolResponsibleModule {}
