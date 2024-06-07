import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { FilterOptionsDto } from './dto/filter-options.dto';

@ApiBearerAuth()
@ApiTags('attendance')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateAttendanceDto)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/findAttendance')
  @HttpCode(200)
  async findAttendance(@Query() pageOptionsDto: PageOptionsDto, @Body() filterOptionsDto: FilterOptionsDto): Promise<PageDto<CreateAttendanceDto>> {
    return this.attendanceService.findAttendance(pageOptionsDto, filterOptionsDto);
  }
}