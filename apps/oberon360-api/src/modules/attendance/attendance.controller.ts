import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../config/constanst';
import { PageOptionsDto } from '../../dtos-globals/page-options.dto';
import { PageDto } from '../../dtos-globals/page.dto';

@ApiBearerAuth()
@ApiTags('attendance')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateAttendanceDto)
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/findAttendance')
  @HttpCode(200)
  async findAttendance(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateAttendanceDto>> {
    return this.attendanceService.findAttendance(pageOptionsDto);
  }
}