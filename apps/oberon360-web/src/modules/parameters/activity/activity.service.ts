import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { MapActivity } from './entities/map-activity.entity';
import { MapProtocol } from '../protocol/entities/map-protocol.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(MapActivity, 'MAP') private repositoryMapActivity: Repository<MapActivity>,
    @InjectRepository(MapProtocol, 'MAP') private repositoryMapProtocol: Repository<MapProtocol>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<MapActivity>>{
    const queryBuilder = this.repositoryMapActivity.createQueryBuilder("activity")
      .andWhere(qb => {
        qb.where('(activity.PREFUN_PREGUNTA LIKE :term)', {term: `%${pageOptionsDto.term}%`})
      })
      .orderBy("activity.PREFUN_ID", pageOptionsDto.order)
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

  async findOne(id: string): Promise<MapActivity | NotFoundException>{
    const data = await this.repositoryMapActivity.createQueryBuilder("activity")
      .where("activity.PREFUN_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe una actividad con el id '+id);

    return data;
  }

  async create(dto: CreateActivityDto): Promise<{ message: string }> {
    const data = this.repositoryMapActivity.create({
      ...dto,
      PREFUN_ID: dto.PREFUN_ID,
      PREFUN_STATUS: dto.PREFUN_STATUS
    });

    await this.repositoryMapActivity.save(data);

    return { message: 'Actividad registrada exitosamente' };
  }

  async update(id: string, dto: UpdateActivityDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe la actividad solicitada' });

    await this.repositoryMapActivity.update(id, dto);
  
    return { message: 'Actividad actualizada exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    if (await this.repositoryMapProtocol.findOneBy({FUN_PREG_ID: id})) throw new NotFoundException({ message: 'No es posible eliminar este elemento porque está vinculado a un protocolo.' });

    await this.repositoryMapActivity.delete(id);

    return {message: 'Actividad eliminada exitosamente'};
  }
}