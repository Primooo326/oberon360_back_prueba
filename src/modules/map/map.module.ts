import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUbication } from './entities/client-ubication.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { User } from 'src/auth/entities/user.entity';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientUbication, Client], 'COP'),
    TypeOrmModule.forFeature([User], 'OC'),
  ],
  controllers: [MapController],
  providers: [MapService, JwtStrategy],
})
export class MapModule {}
