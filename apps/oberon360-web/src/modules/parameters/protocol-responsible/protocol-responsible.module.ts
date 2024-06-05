import { Module } from '@nestjs/common';
import { ProtocolResponsibleService } from './protocol-responsible.service';
import { ProtocolResponsibleController } from './protocol-responsible.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolResponsible } from './entities/protocol-responsible.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProtocolResponsible], 'MAP'),
  ],
  controllers: [ProtocolResponsibleController],
  providers: [ProtocolResponsibleService, JwtStrategy],
})
export class ProtocolResponsibleModule {}