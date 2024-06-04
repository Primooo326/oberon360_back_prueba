import { Module } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';

@Module({
  controllers: [ProtocolController],
  providers: [ProtocolService],
})
export class ProtocolModule {}
