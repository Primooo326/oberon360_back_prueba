import { Controller, Get, Post, Body, Param, Delete, HttpCode, Query, ParseIntPipe, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { ApiPaginatedResponse } from 'src/config/constanst';

@ApiBearerAuth()
@ApiTags('attendance')
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

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateAttendanceDto) {
    return await this.attendanceService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateAttendanceDto) {
    return await this.attendanceService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.attendanceService.remove(id);
  }
}