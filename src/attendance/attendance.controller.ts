import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

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
    return this.attendanceService.findAttendance();
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateAttendanceDto>> {
    return this.attendanceService.findAll(pageOptionsDto);
  }
}