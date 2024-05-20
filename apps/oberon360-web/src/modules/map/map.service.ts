import { HttpException, Injectable } from '@nestjs/common';
import { MapDto } from './dto/map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientUbication } from './entities/client-ubication.entity';
import { UserLoginDto } from 'apps/oberon360-api/src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { Client } from './entities/client.entity';
import { ServicesForClientDto } from './dto/services-for-client.dto';
import { LineServicesForClientDto } from './dto/line-services-for-client.dto';
import { Vehicle } from './entities/vehicle.entity';
import { OpeGps } from './entities/ope-gps.entity';
import { Driver } from './entities/driver.entity';
import { ItineraryPointExecuted } from './entities/itinerary-point-executed.entity';
import { User } from 'apps/oberon360-api/src/modules/user/entities/user.entity';
import { CreateZProtocolosDto } from './dto/create-z-protocolo.dto';
import { ZProtocolo } from './entities/z-protocolos.entity';
import { ZEventos } from './entities/z-events.entity';
import { CreatePointsMapsDto } from './dto/create-points-maps.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(User, 'OC') private repositoryUser: Repository<User>,
    @InjectRepository(ClientUbication, 'COP') private repositoryClientUbic: Repository<ClientUbication>,
    @InjectRepository(Client, 'COP') private repositoryClient: Repository<Client>,
    @InjectRepository(Vehicle, 'MAP') private repositoryVehicle: Repository<Vehicle>,
    @InjectRepository(OpeGps, 'MDA') private repositoryOpeGps: Repository<OpeGps>,
    @InjectRepository(Driver, 'MAP') private repositoryDriver: Repository<Driver>,
    @InjectRepository(ItineraryPointExecuted, 'MAP') private repositoryItineraryPointExecuted: Repository<ItineraryPointExecuted>,
    @InjectRepository(ZProtocolo, 'OC') private repositoryZProtocolo: Repository<ZProtocolo>,
    @InjectRepository(ZEventos, 'OC') private repositoryZEvents: Repository<ZEventos>,
  ) { }

  public async createZProtocolos(createZProtocolosDto: CreateZProtocolosDto): Promise<any> 
  {
    const data = this.repositoryZProtocolo.create(createZProtocolosDto);
    await this.repositoryZProtocolo.save(data);

    return {message: 'Protocolo registrado exitosamente'};
  }

  public async createPointsMaps(createPointsMapsDto: CreatePointsMapsDto): Promise<any> 
  {
    const data = this.repositoryZEvents.create(createPointsMapsDto);
    await this.repositoryZEvents.save(data);

    return {message: 'Punto registrado exitosamente'};
  }

  public async getEventsShips(): Promise<any> 
  {
    const data = await this.repositoryZEvents.createQueryBuilder('events')
        .getMany();

    return data;
  }

  public async getUbications(mapDto: MapDto, user: UserLoginDto): Promise<ClientUbication[]> 
  {
    const infoUser = await this.repositoryUser.createQueryBuilder('users')
      .leftJoinAndSelect('users.userZone', 'userZone')
      .where({SUSU_ID_REG: user.userId})
      .getOne();
    
    const { CLIUBIC_ID_CLIENT } = mapDto;
    const { SUZ_LIMIT_LATITUD_SUR, SUZ_LIMIT_LATITUD_NORTE, SUZ_LIMIT_LONGITUD_ESTE, SUZ_LIMIT_LONGITUD_OESTE } = infoUser?.userZone;

    const queryBuilder = await this.repositoryClientUbic.createQueryBuilder('clientUbication')
      .leftJoinAndSelect('clientUbication.client', 'infoClient')
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

  public async getClients(pageOptionsDto: PageOptionsDto): Promise<PageDto<Client>> 
  {
    const queryBuilder = await this.repositoryClient.createQueryBuilder("clients")
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

  public async getLinesServicesForClient(lineServicesForClientDto: LineServicesForClientDto): Promise<any[]> 
  {
    const { CLIE_ID_REG } = lineServicesForClientDto;

    const data = await this.repositoryClient.createQueryBuilder('client')
        .leftJoinAndSelect('client.document', 'document')
        .leftJoinAndSelect('document.documentService', 'documentService')
        .leftJoinAndSelect('documentService.inventoryTree', 'inventoryTree')
        .leftJoinAndSelect('inventoryTree.lineService', 'lineService')
        .where({ CLIE_ID_REG: CLIE_ID_REG })
        .getOne();

    const lineServices: any[] = await this.getLineServicesFromData(data);

    const lineServicesGroup: any[] = await this.getLineServicesGroup(lineServices);

    return lineServicesGroup;
  }
  
  private async getLineServicesFromData(data: any): Promise<any[]> 
  {
    const lineServices: any[] = [];

    if (data && data.document) {
        for (const document of data.document) {
            if (document && document.documentService) {
                for (const documentService of document.documentService) {
                    if (documentService && documentService.inventoryTree) {
                        if (Array.isArray(documentService.inventoryTree)) {
                            for (const tree of documentService.inventoryTree) {
                                if (tree && tree.lineService) {
                                    lineServices.push(tree.lineService);
                                }
                            }
                        } else {
                            if (documentService.inventoryTree.lineService) {
                                lineServices.push(documentService.inventoryTree.lineService);
                            }
                        }
                    }
                }
            }
        }
    }

    return lineServices;
  }

  private async getLineServicesGroup(lineServices: any)
  {
    const uniqueLineServices = lineServices.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.LINSER_ID_REG]) {
          accumulator[currentValue.LINSER_ID_REG] = {
              "LINSER_ID_REG": currentValue.LINSER_ID_REG,
              "LINSER_NAME": currentValue.LINSER_NAME,
              "count": 1
          };
      } else {
          accumulator[currentValue.LINSER_ID_REG].count++;
      }
      return accumulator;
    }, {});
    
    const result = Object.values(uniqueLineServices);

    return result;
  }

  public async getServicesForClient(servicesForClientDto: ServicesForClientDto): Promise<any> 
  {
    const { CLIE_ID_REG, LINSER_ID_REG } = servicesForClientDto;

    const data = await this.repositoryClient.createQueryBuilder('client')
        .leftJoinAndSelect('client.document', 'document')
        .leftJoinAndSelect('document.documentService', 'documentService')
        .leftJoinAndSelect('documentService.inventoryTree', 'inventoryTree')
        .leftJoinAndSelect('inventoryTree.lineService', 'lineService')
        .where('client.CLIE_ID_REG = :CLIE_ID_REG', { CLIE_ID_REG })
        .andWhere('lineService.LINSER_ID_REG = :LINSER_ID_REG', { LINSER_ID_REG })
        .getOne();

    const inventoryTrees: any[] = await this.getInventoryTreesFromData(data);

    const inventoryTreesGroup: any = await this.getInventoryTreesGroup(inventoryTrees);

    return inventoryTreesGroup;
  }

  private async getInventoryTreesFromData(data: any): Promise<any[]> 
  {
    const inventoryTrees: any[] = [];

    if (data && data.document) {
        for (const document of data.document) {
            if (document && document.documentService) {
                for (const documentService of document.documentService) {
                    if (documentService && documentService.inventoryTree) {
                        inventoryTrees.push(documentService.inventoryTree);
                    }
                }
            }
        }
    }

    return inventoryTrees;
  }

  private async getInventoryTreesGroup(inventoryTrees: any): Promise<any> 
  {
    return Object.values(inventoryTrees.reduce((acc, curr) => {
      if (!acc[curr.ARBOL_INVE_ID_REG]) {
          acc[curr.ARBOL_INVE_ID_REG] = curr;
      }
      return acc;
    }, {}));
  }

  public async getEventsPlates(): Promise<any> 
  {
    const data = await this.repositoryVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
    
    const dataWithItinerary = data.filter(item => item.ITINE_ID !== null);
    
    const vehiclesWithStatus = await Promise.all(dataWithItinerary.map(async (vehicle) => {
      const itineraryPointsExecuted = await this.repositoryItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
        .leftJoin('itineraryPointExecuted.point', 'point')
        .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: vehicle.ITNE_ID })
        .andWhere('point.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
        .getMany();
  
      const status = this.getVehicleStatus(vehicle, itineraryPointsExecuted);
      vehicle.statusItinerary = status;
      return vehicle;
    }));
  
    return vehiclesWithStatus;
  }

  public async getEventsPlatesDispon(): Promise<any>
  {
    const data = await this.repositoryVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
    
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
    const itineraryPointExecuted = await this.repositoryItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
      .leftJoinAndSelect('itineraryPointExecuted.point', 'point')
      .leftJoinAndSelect('itineraryPointExecuted.state', 'state')
      .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: ITNE_ID })
      .andWhere('point.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
      .getMany();
      
    return itineraryPointExecuted;
  }

  public async getEventsMotorcycle() 
  {
    let data = await this.repositoryOpeGps.query('EXEC SP015_SEL_CO118_ULTIMO_GPS_V2');

    return data;
  }

  public async getInfoDriver(CONDUCTOR_ID: string): Promise<any>
  {
    const driver = await this.repositoryDriver.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.typeIdentification', 'typeIdentification')
      .leftJoinAndSelect('employee.factorRh', 'factorRh')
      .where({CONDUCTOR_ID})
      .getOne(); 

    if (!driver) throw new HttpException('No existe el conductor solicitado', 404);

    driver.CONDUCTOR_FOTO = this.bufferToBase64(driver.CONDUCTOR_FOTO);

    return driver;
  }

  public async reportsIndicators(): Promise<any> 
  {
    try {
      let vehiclesData = await this.repositoryVehicle.query('EXEC SP504_GET_OPE012_LAST_GPS_V3 @PUNTO = @0, @FLOTA = @1, @DISTRIBUIDOR = @2, @UBICACION = @3', [null, null, null, null]);
  
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
      const itineraryPointsExecuted = await this.repositoryItineraryPointExecuted.createQueryBuilder('itineraryPointExecuted')
        .leftJoin('itineraryPointExecuted.point', 'point')
        .where('itineraryPointExecuted.IPE_IDASIGNACION = :IPE_IDASIGNACION', { IPE_IDASIGNACION: vehicle.ITNE_ID })
        .andWhere('point.PUN_STATUS = :PUN_STATUS', { PUN_STATUS: 1 })
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