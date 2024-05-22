import { Controller, Post, Body, HttpCode, UseGuards,Request, Get, Query, Param } from '@nestjs/common';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/oberon360-api/src/jwt/jwt-auth.guard';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { Client } from './entities/client.entity';
import { ServicesForClientDto } from './dto/services-for-client.dto';
import { LineServicesForClientDto } from './dto/line-services-for-client.dto';
import { EventPlate } from './entities/event-plate.entity';
import { EventsMotorcycleDto } from './dto/events-motorcycle.dto';
import { CreateZProtocolosDto } from './dto/create-z-protocolo.dto';
import { ZEventos } from './entities/z-events.entity';
import { CreatePointsMapsDto } from './dto/create-points-maps.dto';

@ApiBearerAuth()
@ApiTags('map')
@UseGuards(JwtAuthGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @HttpCode(200)
  @Get('getEventsShips')
  async getEventsShips(): Promise<PageDto<ZEventos>> {
    return this.mapService.getEventsShips();
  }

  @HttpCode(200)
  @Post('createZProtocolos')
  createZProtocolos(@Body() createZProtocolosDto: CreateZProtocolosDto) {
    return this.mapService.createZProtocolos(createZProtocolosDto);
  }

  @HttpCode(200)
  @Post('createPointsMaps')
  createPointsMaps(@Body() createPointsMapsDto: CreatePointsMapsDto) {
    return this.mapService.createPointsMaps(createPointsMapsDto);
  }

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

  @HttpCode(200)
  @Get('getEventsPlates')
  async getEventsPlates(): Promise<EventPlate[]> {
    return this.mapService.getEventsPlates();
  }

  @HttpCode(200)
  @Get('getEventsPlatesDispon')
  async getEventsPlatesDispon(): Promise<EventPlate[]> {
    return this.mapService.getEventsPlatesDispon();
  }

  @HttpCode(200)
  @Get('getItinerary/:ITNE_ID')
  async getItinerary(@Param('ITNE_ID') id: string): Promise<any> {
    return this.mapService.getItinerary(id);
  }

  @HttpCode(200)
  @Get('getEventsMotorcycle')
  async getEventsMotorcycle(@Query() eventsMotorcycleDto: EventsMotorcycleDto): Promise<any> {
    return this.mapService.getEventsMotorcycle();
  }

  @HttpCode(200)
  @Get('getInfoDriver/:CONDUCTOR_ID')
  async getInfoDriver(@Param('CONDUCTOR_ID') id: string): Promise<any> {
    return this.mapService.getInfoDriver(id);
  }

  @HttpCode(200)
  @Get('reportsIndicators')
  async reportsIndicators(): Promise<any> {
    return this.mapService.reportsIndicators();
  }
}