import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProtocolResponsibleDto } from './dto/create-protocol-responsible.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { ProtocolResponsible } from './entities/protocol-responsible.entity';
import { UpdateProtocolResponsibleDto } from './dto/update-protocol-responsible.dto';

@Injectable()
export class ProtocolResponsibleService {
  constructor(
    @InjectRepository(ProtocolResponsible, 'MAP') private repositoryProtocolResponsible: Repository<ProtocolResponsible>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProtocolResponsible>>{
    const queryBuilder = this.repositoryProtocolResponsible.createQueryBuilder("protocolResponsible")
      .andWhere(qb => {
        qb.where('(protocolResponsible.TFUN_NOMBRE LIKE :term)', {term: `%${pageOptionsDto.term}%`})
      })
      .orderBy("protocolResponsible.TFUN_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<ProtocolResponsible | NotFoundException>{
    const data = await this.repositoryProtocolResponsible.createQueryBuilder("protocolResponsible")
      .where("protocolResponsible.TFUN_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un responsable de responsable de protocolo con el id '+id);

    return data;
  }

  async create(dto: CreateProtocolResponsibleDto): Promise<{ message: string }> {
    const data = this.repositoryProtocolResponsible.create({
      ...dto,
      TFUN_ID: dto.TFUN_ID,
      TFUN_STATUS: '1'
    });

    await this.repositoryProtocolResponsible.save(data);

    return { message: 'Responsable de protocolo registrado exitosamente' };
  }

  async update(id: string, dto: UpdateProtocolResponsibleDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el responsable de protocolo solicitado' });

    await this.repositoryProtocolResponsible.update(id, dto);
  
    return { message: 'Responsable de protocolo actualizado exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryProtocolResponsible.delete(id);

    return {message: 'Responsable de protocolo eliminado exitosamente'};
  }
}