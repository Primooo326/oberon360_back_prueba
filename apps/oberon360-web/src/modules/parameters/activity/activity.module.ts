import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity], 'MAP'),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, JwtStrategy],
})
export class ActivityModule {}