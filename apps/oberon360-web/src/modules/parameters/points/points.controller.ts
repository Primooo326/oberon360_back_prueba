import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreatePointDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.pointsService.findAll(pageOptionsDto);
  }
}
