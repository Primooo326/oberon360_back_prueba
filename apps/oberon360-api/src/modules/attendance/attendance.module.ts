import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from './entities/schedules.entity';
import { Attendance } from './entities/attendance.entity';
import { JwtStrategy } from '../../jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedules], 'COP'),
    TypeOrmModule.forFeature([Attendance], 'ICP'),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, JwtStrategy],
})
export class AttendanceModule {}
