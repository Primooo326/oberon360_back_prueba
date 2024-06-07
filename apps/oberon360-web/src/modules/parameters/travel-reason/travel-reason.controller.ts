import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, Query, Res } from '@nestjs/common';
import { TravelReasonService } from './travel-reason.service';
import { CreateTravelReasonDto } from './dto/create-travel-reason.dto';
import { UpdateTravelReasonDto } from './dto/update-travel-reason.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { ApiPaginatedResponse } from 'apps/oberon360-api/src/config/constanst';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';

@ApiBearerAuth()
@ApiTags('travel-reason')
@UseGuards(JwtAuthGuard)
@ApiPaginatedResponse(CreateTravelReasonDto)
@Controller('travel-reason')
export class TravelReasonController {
  constructor(private readonly travelReasonService: TravelReasonService) {}

  @Get()
  @HttpCode(200)
  @ApiPaginatedResponse(CreateTravelReasonDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<any> {
    return this.travelReasonService.findAll(pageOptionsDto);
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelReasonService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() dto: CreateTravelReasonDto) {
    return await this.travelReasonService.create(dto);
  }

  @HttpCode(201)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTravelReasonDto) {
    return await this.travelReasonService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.travelReasonService.remove(id);
  }
}