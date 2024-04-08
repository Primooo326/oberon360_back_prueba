import { Controller, Post, Body, HttpCode, UseGuards,Request, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { Client } from './entities/client.entity';
import { ServicesForClientDto } from './dto/services-for-client.dto';
import { LineServicesForClientDto } from './dto/line-services-for-client.dto';

@ApiBearerAuth()
@ApiTags('easy-recognition')
@UseGuards(JwtAuthGuard)
@Controller('api/map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @HttpCode(200)
  @Post('getUbications')
  loginUser(@Body() mapDto: MapDto, @Request() req) {
    return this.mapService.getUbications(mapDto, req.user);
  }

  @HttpCode(200)
  @Get('getClients')
  async getClients(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Client>> {
    return this.mapService.getClients(pageOptionsDto);
  }

  @HttpCode(200)
  @Post('getLinesServicesForClient')
  async getLinesServicesForClient(@Body() lineServicesForClientDto: LineServicesForClientDto): Promise<any> {
    return this.mapService.getLinesServicesForClient(lineServicesForClientDto);
  }

  @HttpCode(200)
  @Post('getServicesForClient')
  async getServicesForClient(@Body() servicesForClientDto: ServicesForClientDto): Promise<any> {
    return this.mapService.getServicesForClient(servicesForClientDto);
  }
}