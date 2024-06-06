import { HttpException, Injectable } from '@nestjs/common';
import { MapDto } from './dto/map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CopClientUbication } from './entities/client-ubication.entity';
import { UserLoginDto } from 'apps/oberon360-api/src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { CopClient } from './entities/client.entity';
import { ServicesForClientDto } from './dto/services-for-client.dto';
import { LineServicesForClientDto } from './dto/line-services-for-client.dto';
import { MapVehicle } from './entities/vehicle.entity';
import { MdaOpeGps } from './entities/ope-gps.entity';
import { MapItineraryPointExecuted } from './entities/itinerary-point-executed.entity';
import { CreateZProtocolosDto } from './dto/create-z-protocolo.dto';
import { OcZProtocolo } from './entities/z-protocolos.entity';
import { OcZEventos } from './entities/z-events.entity';
import { CreatePointsMapsDto } from './dto/create-points-maps.dto';
import { MapDriver } from '../parameters/driver/entities/driver.entity';
import { OcUser } from 'apps/oberon360-api/src/modules/user/entities/oc-user.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(OcUser, 'OC') private repositoryOcUser: Repository<OcUser>,
    @InjectRepository(CopClientUbication, 'COP') private repositoryCopClientUbication: Repository<CopClientUbication>,
    @InjectRepository(CopClient, 'COP') private repositoryCopClient: Repository<CopClient>,
    @InjectRepository(MapVehicle, 'MAP') private repositoryMapVehicle: Repository<MapVehicle>,
    @InjectRepository(MdaOpeGps, 'MDA') private repositoryMdaOpeGps: Repository<MdaOpeGps>,
    @InjectRepository(MapDriver, 'MAP') private repositoryMapDriver: Repository<MapDriver>,
    @InjectRepository(MapItineraryPointExecuted, 'MAP') private repositoryMapItineraryPointExecuted: Repository<MapItineraryPointExecuted>,
    @InjectRepository(OcZProtocolo, 'OC') private repositoryOcZProtocolo: Repository<OcZProtocolo>,
    @InjectRepository(OcZEventos, 'OC') private repositoryOcZEvents: Repository<OcZEventos>,
  ) { }

  public async createZProtocolos(createZProtocolosDto: CreateZProtocolosDto): Promise<any> 
  {
    const data = this.repositoryOcZProtocolo.create(createZProtocolosDto);
    await this.repositoryOcZProtocolo.save(data);

    return {message: 'Protocolo registrado exitosamente'};
  }

  public async createPointsMaps(createPointsMapsDto: CreatePointsMapsDto): Promise<any> 
  {
    const validatedLocation = `geography::STGeomFromText('${createPointsMapsDto.CLIPMARK_EVENT_LOCATION}', 4326)`;

    const data = this.repositoryOcZEvents.create({
      ...createPointsMapsDto,
      CLIPMARK_EVENT_LOCATION : validatedLocation
    });
    await this.repositoryOcZEvents.save(data);

    return {message: 'Punto registrado exitosamente'};
  }

  public async getEventsShips(): Promise<any> 
  {
    const data = await this.repositoryOcZEvents.createQueryBuilder('events')
        .getMany();

    for (const element of data) {
      const coordinates = await this.extractCoordinates(element.CLIPMARK_EVENT_LOCATION);

      element.CLIPMARK_LATITUD = coordinates.latitude.toString();
      element.CLIPMARK_LONGITUD = coordinates.longitude.toString();
    }

    return data;
  }

  extractCoordinates(location: string) { 
    const match = location.match(/POINT\s*\(\s*([\d.-]+)\s+([\d.-]+)\s*\)/);
    if (!match) {
      throw new Error('Invalid location format');
    }

    const longitude = parseFloat(match[1]);
    const latitude = parseFloat(match[2]);

    return {
      longitude,
      latitude
    }
  }

  public async getUbications(mapDto: MapDto, user: UserLoginDto): Promise<CopClientUbication[]> 
  {
    const infoUser = await this.repositoryOcUser.createQueryBuilder('copUsers')
      .leftJoinAndSelect('copUsers.ocUserZone', 'ocUserZone')
      .where({SUSU_ID_REG: user.userId})
      .getOne();
    
    const { CLIUBIC_ID_CLIENT } = mapDto;
    const { SUZ_LIMIT_LATITUD_SUR, SUZ_LIMIT_LATITUD_NORTE, SUZ_LIMIT_LONGITUD_ESTE, SUZ_LIMIT_LONGITUD_OESTE } = infoUser?.ocUserZone;

    const queryBuilder = await this.repositoryCopClientUbication.createQueryBuilder('clientUbication')
      .leftJoinAndSelect('clientUbication.copClient', 'infoClient')
      .andWhere('CAST(clientUbication.CLIUBIC_LATITUD AS FLOAT) > :limitLatitudSur', { limitLatitudSur: parseFloat(SUZ_LIMIT_LATITUD_SUR) })
      .andWhere('CAST(clientUbication.CLIUBIC_LATITUD AS FLOAT) < :limitLatitudNorte', { limitLatitudNorte: parseFloat(SUZ_LIMIT_LATITUD_NORTE) })
      .andWhere('CAST(clientUbication.CLIUBIC_LONGITUD AS FLOAT) > :limitLongitudOeste', { limitLongitudOeste: parseFloat(SUZ_LIMIT_LONGITUD_OESTE) })
      .andWhere('CAST(clientUbication.CLIUBIC_LONGITUD AS FLOAT) < :limitLongitudEste', { limitLongitudEste: parseFloat(SUZ_LIMIT_LONGITUD_ESTE) });

    if (CLIUBIC_ID_CLIENT) {
      queryBuilder.andWhere({ CLIUBIC_ID_CLIENTE: CLIUBIC_ID_CLIENT });
    }

    const data = await queryBuilder.getMany();

    return data;
  }

  public async getClients(pageOptionsDto: PageOptionsDto): Promise<PageDto<CopClient>> 
  {
    const queryBuilder = await this.repositoryCopClient.createQueryBuilder("clients")
      .select(['clients.CLIE_ID_REG', 'clients.CLIE_COMERCIAL'])
      .orWhere('clients.CLIE_COMERCIAL LIKE :CLIE_COMERCIAL', { CLIE_COMERCIAL: `%${pageOptionsDto.term}%` })
      .orderBy("clients.CLIE_ID_REG", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public async getLinesServicesForClient(lineServicesForClientDto: LineServicesForClientDto): Promise<any> {
    const { CLIE_ID_REG } = lineServicesForClientDto;

    try {
        const data = await this.repositoryCopClient.createQueryBuilder('copClient')
            .leftJoinAndSelect('copClient.copDocument', 'copDocument')
            .leftJoinAndSelect('copDocument.copDocumentService', 'copDocumentService')
            .leftJoinAndSelect('copDocumentService.copInventoryTree', 'copInventoryTree')
            .leftJoinAndSelect('copInventoryTree.copLineService', 'copLineService')
            .where({ CLIE_ID_REG })
            .getOne();

        const lineServices = await this.getLineServicesFromData(data);

        return await this.getLineServicesGroup(lineServices);
    } catch (error) {
        console.error('Error in getLinesServicesForClient:', error);
        throw error;
    }
  }

  private async getLineServicesFromData(data: any): Promise<any[]> {
      const lineServices: any[] = [];

      if (data?.copDocument) {
          for (const document of data.copDocument) {
              if (document?.copDocumentService) {
                  for (const documentService of document.copDocumentService) {
                      if (documentService?.copInventoryTree) {
                          const trees = Array.isArray(documentService.copInventoryTree)
                              ? documentService.copInventoryTree
                              : [documentService.copInventoryTree];
                          for (const tree of trees) {
                              if (tree?.copLineService) {
                                  lineServices.push(tree.copLineService);
                              }
                          }
                      }
                  }
              }
          }
      }

      return lineServices;
  }

  private async getLineServicesGroup(lineServices: any[]): Promise<any[]> {
      const uniqueLineServices = lineServices.reduce((accumulator, currentValue) => {
          if (!accumulator[currentValue.LINSER_ID_REG]) {
              accumulator[currentValue.LINSER_ID_REG] = {
                  LINSER_ID_REG: currentValue.LINSER_ID_REG,
                  LINSER_NAME: currentValue.LINSER_NAME,
                  count: 1
              };
          } else {
              accumulator[currentValue.LINSER_ID_REG].count++;
          }
          return accumulator;
      }, {});

      return Object.values(uniqueLineServices);
  }

  public async getServicesForClient(servicesForClientDto: ServicesForClientDto): Promise<any> {
    const { CLIE_ID_REG, LINSER_ID_REG } = servicesForClientDto;

    try {
        const data = await this.repositoryCopClient.createQueryBuilder('copClient')
            .leftJoinAndSelect('copClient.copDocument', 'copDocument')
            .leftJoinAndSelect('copDocument.copDocumentService', 'copDocumentService')
            .leftJoinAndSelect('copDocumentService.copInventoryTree', 'copInventoryTree')
            .leftJoinAndSelect('copInventoryTree.copLineService', 'copLineService')
            .where('copClient.CLIE_ID_REG = :CLIE_ID_REG', { CLIE_ID_REG })
            .andWhere('copLineService.LINSER_ID_REG = :LINSER_ID_REG', { LINSER_ID_REG })
            .getOne();

        const inventoryTrees = await this.getInventoryTreesFromData(data);
        return await this.getInventoryTreesGroup(inventoryTrees);
    } catch (error) {
        console.error('Error en getServicesForClient:', error);
        throw error;
    }
  }

  private async getInventoryTreesFromData(data: any): Promise<any[]> {
      const inventoryTrees: any[] = [];

      if (data?.copDocument) {
          for (const document of data.copDocument) {
              if (document?.copDocumentService) {
                  for (const documentService of document.copDocumentService) {
                      if (documentService?.copInventoryTree) {
                          const trees = Array.isArray(documentService.copInventoryTree)
                              ? documentService.copInventoryTree
                              : [documentService.copInventoryTree];
                          inventoryTrees.push(...trees);
                      }
                  }
              }
          }
      }

      return inventoryTrees;
  }

  private async getInventoryTreesGroup(inventoryTrees: any[]): Promise<any> {
      const uniqueInventoryTrees = inventoryTrees.reduce((acc, curr) => {
          if (!acc[curr.ARBOL_INVE_ID_REG]) {
              acc[curr.ARBOL_INVE_ID_REG] = curr;
          }
          return acc;
      }, {});

      return Object.values(uniqueInventoryTrees);
  }

  public async getEventsPlates(): Promise<any> 
  {
    const data = await this.repositoryMapVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
    
    const dataWithItinerary = data.filter(item => item.ITINE_ID !== null);
    
    const vehiclesWithStatus = await Promise.all(dataWithItinerary.map(async (vehicle) => {
      const itineraryPointsExecuted = await this.repositoryMapItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
        .leftJoin('itineraryPointExecuted.mapPoint', 'mapPoint')
        .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: vehicle.ITNE_ID })
        .andWhere('mapPoint.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
        .getMany();
  
      const status = this.getVehicleStatus(vehicle, itineraryPointsExecuted);
      vehicle.statusItinerary = status;
      return vehicle;
    }));
  
    return vehiclesWithStatus;
  }

  public async getEventsPlatesDispon(): Promise<any>
  {
    const data = await this.repositoryMapVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
    
    const dataWithoutItinerary = data.filter(item => item.ITINE_ID === null);
  
    return dataWithoutItinerary;
  }
  
  private getVehicleStatus(vehicle, itineraryPointsExecuted): string
  {
    if (vehicle.ESTADOVH === 'INCOMUNICADO') {
      return 'notReported';
    }
  
    const itineraryWithArrivalDate = itineraryPointsExecuted.filter(item => item.IPE_FECHA_LLEGADA !== null);
    const itineraryWithoutArrivalDate = itineraryPointsExecuted.filter(item => item.IPE_FECHA_LLEGADA === null);
    
    if (itineraryWithoutArrivalDate.length > 0) {
      return 'delay';
    }
  
    const lastRecordWithArrivalDate = itineraryWithArrivalDate[itineraryWithArrivalDate.length - 1];
    if (lastRecordWithArrivalDate && lastRecordWithArrivalDate.IPE_FECHA_PRESUPUESTADO && lastRecordWithArrivalDate.IPE_FECHA_LLEGADA && (lastRecordWithArrivalDate.IPE_FECHA_PRESUPUESTADO > lastRecordWithArrivalDate.IPE_FECHA_LLEGADA)) {
      return 'advance';
    }
  
    return 'delay';
  }

  public async getItinerary(ITNE_ID: string)
  {
    const itineraryPointExecuted = await this.repositoryMapItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
      .leftJoinAndSelect('itineraryPointExecuted.mapPoint', 'mapPoint')
      .leftJoinAndSelect('itineraryPointExecuted.mapStateIpe', 'mapStateIpe')
      .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: ITNE_ID })
      .andWhere('mapPoint.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
      .getMany();
      
    return itineraryPointExecuted;
  }

  public async getEventsMotorcycle() 
  {
    let data = await this.repositoryMdaOpeGps.query('EXEC SP015_SEL_CO118_ULTIMO_GPS_V2');

    return data;
  }

  public async getInfoDriver(CONDUCTOR_ID: string): Promise<any>
  {
    const driver = await this.repositoryMapDriver.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.mapTypeIdentification', 'mapTypeIdentification')
      .leftJoinAndSelect('employee.mapFactorRh', 'mapFactorRh')
      .where({CONDUCTOR_ID})
      .getOne(); 

    if (!driver) throw new HttpException('No existe el conductor solicitado', 404);

    driver.CONDUCTOR_FOTO = this.bufferToBase64(driver.CONDUCTOR_FOTO);

    return driver;
  }

  public async reportsIndicators(): Promise<any> 
  {
    try {
      let vehiclesData = await this.repositoryMapVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
  
      const vehiclesWithItinerary = vehiclesData.filter(vehicle => vehicle.ITINE_ID !== null);
      const vehiclesWithoutItinerary = vehiclesData.filter(vehicle => vehicle.ITINE_ID === null);
  
      const totalVehicles = vehiclesData.length;
      const vehiclesInOperation = vehiclesWithItinerary.length;
      const vehiclesAvailable = vehiclesWithoutItinerary.length;
  
      const itineraryPointExecutedArr: any[] = await this.getIneraryPointExecuted(vehiclesWithItinerary);
  
      let delayCount: number = 0;
      let advanceCount: number = 0;
      let notReportedCount: number = 0;
  
      await Promise.all(itineraryPointExecutedArr.map(async (itinerary) => {
        if (itinerary.element.ESTADOVH == 'INCOMUNICADO') {
          notReportedCount++;
          return;
        }
        
        const itineraryWithArrivalDate = itinerary.itinerary.filter(item => item.IPE_FECHA_LLEGADA !== null);
        const itineraryWithoutArrivalDate = itinerary.itinerary.filter(item => item.IPE_FECHA_LLEGADA === null);
        
        if (itineraryWithoutArrivalDate.length > 0) {
          delayCount++;
        } else {
          const lastRecordWithArrivalDate = itineraryWithArrivalDate[itineraryWithArrivalDate.length - 1];
          if (lastRecordWithArrivalDate && lastRecordWithArrivalDate.IPE_FECHA_PRESUPUESTADO && lastRecordWithArrivalDate.IPE_FECHA_LLEGADA && (lastRecordWithArrivalDate.IPE_FECHA_PRESUPUESTADO > lastRecordWithArrivalDate.IPE_FECHA_LLEGADA)) {
            advanceCount++;
          } else {
            delayCount++;
          }
        }
      }));

      return {
        delay: {
          total: delayCount,
          percentage: Math.round(delayCount/vehiclesInOperation*100)+"%"
        },
        advance: {
          total: advanceCount,
          percentage: Math.round(advanceCount/vehiclesInOperation*100)+"%"
        },
        notReported: {
          total: notReportedCount,
          percentage: Math.round(notReportedCount/vehiclesInOperation*100)+"%"
        },
        inOperation: {
          total: vehiclesInOperation,
          percentage: Math.round(vehiclesInOperation/totalVehicles*100)+"%"
        },
        available: {
          total: vehiclesAvailable,
          percentage: Math.round(vehiclesAvailable/totalVehicles*100)+"%"
        },
        total: {
          total: totalVehicles,
          percentage: "100%"
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async getIneraryPointExecuted(vehiclesWithItinerary)
  {
    const promises = vehiclesWithItinerary.map(async (vehicle) => {
      const itineraryPointsExecuted = await this.repositoryMapItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
        .leftJoin('itineraryPointExecuted.mapPoint', 'mapPoint')
        .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: vehicle.ITNE_ID })
        .andWhere('mapPoint.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
        .getMany();
      
      return {
        element: vehicle,
        itinerary: itineraryPointsExecuted
      };
    });

    return await Promise.all(promises);
  }

  bufferToBase64(buffer: Buffer): string {
    return buffer.toString('base64');
  }
}