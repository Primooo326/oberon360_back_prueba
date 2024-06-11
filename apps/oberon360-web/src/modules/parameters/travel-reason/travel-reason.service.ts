import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreateTravelReasonDto } from './dto/create-travel-reason.dto';
import { UpdateTravelReasonDto } from './dto/update-travel-reason.dto';
import { MapTravelReason } from './entities/map-travel-reason.entity';

@Injectable()
export class TravelReasonService {
  constructor(
    @InjectRepository(MapTravelReason, 'MAP') private repositoryMapTravelReason: Repository<MapTravelReason>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapTravelReason>>{
    const queryBuilder = this.repositoryMapTravelReason.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.VIATIMOT_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
        .andWhere("query.VIATIMOT_STATUS = :state", { state: '1' })
      })
      .orderBy("query.VIATIMOT_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapTravelReason | NotFoundException>{
    const data = await this.repositoryMapTravelReason.createQueryBuilder("query")
      .where("query.VIATIMOT_ID= :id", { id: id })
      .andWhere("query.VIATIMOT_STATUS = :state", { state: '1' })
      .getOne();

    if (!data) throw new NotFoundException('No existe un viático con el id '+id);

    return data;
  }

  async create(dto: CreateTravelReasonDto): Promise<{ message: string }> {
    const data = this.repositoryMapTravelReason.create({
      ...dto,
      VIATIMOT_STATUS: '1',
      VIATIMOT_INSERT_DATE: new Date().toISOString()
    });

    await this.repositoryMapTravelReason.save(data);

    return { message: 'Viático registrado exitosamente' };
  }

  async update(id: string, dto: UpdateTravelReasonDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el viático solicitado' });

    await this.repositoryMapTravelReason.update(id, {
      ...dto,
      VIATIMOT_UPDATE_DATE: new Date().toISOString()
    });
  
    return { message: 'Viático actualizado exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryMapTravelReason.update(id, {
      VIATIMOT_STATUS: '0'
    });

    return {message: 'Viático eliminado exitosamente'};
  }
}