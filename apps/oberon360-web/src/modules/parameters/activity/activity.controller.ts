import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiBearerAuth()
@ApiTags('activity')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateActivityDto)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateActivityDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.activityService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateActivityDto) {
    return await this.activityService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return await this.activityService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.activityService.remove(id);
  }
}