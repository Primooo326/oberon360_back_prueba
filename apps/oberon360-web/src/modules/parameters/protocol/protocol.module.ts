import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapProtocol } from './entities/map-protocol.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MapProtocol], 'MAP'),
  ],
  controllers: [ProtocolController],
  providers: [ProtocolService, JwtStrategy],
})
export class ProtocolModule {}
