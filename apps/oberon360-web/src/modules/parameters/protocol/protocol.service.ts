import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { Protocol } from './entities/protocol.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(Protocol, 'MAP') private repositoryProtocol: Repository<Protocol>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Protocol>>{
    const queryBuilder = this.repositoryProtocol.createQueryBuilder("protocol")
      .leftJoinAndSelect('protocol.protocolResponsible', 'protocolResponsible')
      .leftJoinAndSelect('protocol.activity', 'activity')
      .andWhere(qb => {
        qb.where('(protocol.FUN_FUNCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
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

  async findOne(id: number): Promise<Protocol | NotFoundException>{
    const data = await this.repositoryProtocol.createQueryBuilder("protocol")
      .where("protocol.FUN_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un protocolo con el id '+id);

    return data;
  }

  async create(dto: CreateProtocolDto): Promise<{ message: string }> {
    const data = this.repositoryProtocol.create({
      ...dto,
      FUN_STATUS: '1'
    });

    await this.repositoryProtocol.save(data);

    return { message: 'Protocolo registrado exitosamente' };
  }

  async update(id: number, dto: UpdateProtocolDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el protocolo solicitado' });

    await this.repositoryProtocol.update(id, dto);
  
    return { message: 'Protocolo actualizado exitosamente' };
  } 

  async remove(id: number): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryProtocol.delete(id);

    return {message: 'Protocolo eliminado exitosamente'};
  }
}