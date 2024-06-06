import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopSchedules } from './entities/schedules.entity';
import { IcpAttendance } from './entities/attendance.entity';
import { JwtStrategy } from 'apps/oberon360-api/src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([CopSchedules], 'COP'),
    TypeOrmModule.forFeature([IcpAttendance], 'ICP'),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, JwtStrategy],
})
export class AttendanceModule {}
