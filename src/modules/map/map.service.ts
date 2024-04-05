import { Injectable } from '@nestjs/common';
import { MapDto } from './dto/map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientUbication } from './entities/client-ubication.entity';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { Client } from './entities/client.entity';
import { User } from '../auth/entities/user.entity';
import { ServicesForClientDto } from './dto/services-for-client.dto';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(User, 'OC') private repositoryUser: Repository<User>,
    @InjectRepository(ClientUbication, 'COP') private repositoryClientUbic: Repository<ClientUbication>,
    @InjectRepository(Client, 'COP') private repositoryClient: Repository<Client>,
  ) { }

  async getUbications(mapDto: MapDto, user: UserLoginDto): Promise<ClientUbication[]> {
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

  async getClients(pageOptionsDto: PageOptionsDto): Promise<PageDto<Client>> {
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

  async getServicesForClient(servicesForClientDto: ServicesForClientDto): Promise<any[]> {
    const { CLIE_ID_REG } = servicesForClientDto;

    const data = await this.repositoryClient.createQueryBuilder('client')
        .leftJoin('client.document', 'document')
        .leftJoin('document.documentService', 'documentService')
        .leftJoin('documentService.inventoryTree', 'inventoryTree')
        .select(['client', 'document', 'documentService', 'inventoryTree'])
        .where({ CLIE_ID_REG: CLIE_ID_REG })
        .getOne();

    const inventoryTrees = await this.getInventoryTreesFromData(data);

    return inventoryTrees;
  }
  
  async getInventoryTreesFromData(data: any): Promise<any[]> {
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
}