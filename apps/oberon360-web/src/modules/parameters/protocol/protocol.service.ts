import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapProtocol } from './entities/map-protocol.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(MapProtocol, 'MAP') private repositoryMapProtocol: Repository<MapProtocol>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapProtocol>>{
    const queryBuilder = this.repositoryMapProtocol.createQueryBuilder("protocol")
      .leftJoinAndSelect('protocol.mapProtocolResponsible', 'mapProtocolResponsible')
      .leftJoinAndSelect('protocol.mapActivity', 'mapActivity')
      .andWhere(qb => {
        qb.where('(protocol.FUN_FUNCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .andWhere("protocol.FUN_STATUS = :state", { state: '1' })
      })
      .orderBy("protocol.FUN_ID", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return {
      data: entities,
      meta: pageMetaDto
    }
  }

  async findOne(id: number): Promise<MapProtocol | NotFoundException>{
    const data = await this.repositoryMapProtocol.createQueryBuilder("protocol")
      .where("protocol.FUN_ID= :id", { id: id })
      .andWhere("protocol.FUN_STATUS = :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe un protocolo con el id '+id);

    return data;
  }

  async create(dto: CreateProtocolDto): Promise<{ message: string }> {
    const data = this.repositoryMapProtocol.create({
      ...dto,
      FUN_STATUS: '1',
      FUN_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapProtocol.save(data);

    return { message: 'Protocolo registrado exitosamente' };
  }

  async update(id: number, dto: UpdateProtocolDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el protocolo solicitado' });

    await this.repositoryMapProtocol.update(id, {
      ...dto,
      FUN_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Protocolo actualizado exitosamente' };
  } 

  async remove(id: number): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapProtocol.update(id, {
      FUN_STATUS: '0'
    });

    return {message: 'Protocolo eliminado exitosamente'};
  }
}