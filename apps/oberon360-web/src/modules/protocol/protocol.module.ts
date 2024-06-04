import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocol } from './entities/protocol.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';
import { TypeFunction } from './entities/type-functions.entity';
import { QuestionFunction } from './entities/question-function.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Protocol, TypeFunction, QuestionFunction], 'MAP'),
  ],
  controllers: [ProtocolController],
  providers: [ProtocolService, JwtStrategy],
})
export class ProtocolModule {}
