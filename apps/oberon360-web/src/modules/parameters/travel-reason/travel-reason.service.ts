import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { PageMetaDto } from 'apps/oberon360-api/src/dtos-globals/page-meta.dto';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { CreateTravelReasonDto } from './dto/create-travel-reason.dto';
import { UpdateTravelReasonDto } from './dto/update-travel-reason.dto';
import { TravelReason } from './entities/travel-reason.entity';

@Injectable()
export class TravelReasonService {
  constructor(
    @InjectRepository(TravelReason, 'MAP') private repositoryTravelReason: Repository<TravelReason>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<TravelReason>>{
    const queryBuilder = this.repositoryTravelReason.createQueryBuilder("query")
      .andWhere(qb => {
        qb.where('(query.VIATIMOT_DESCRIPCION LIKE :term)', {term: `%${pageOptionsDto.term}%`})
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

  async findOne(id: string): Promise<TravelReason | NotFoundException>{
    const data = await this.repositoryTravelReason.createQueryBuilder("query")
      .where("query.VIATIMOT_ID= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un viático con el id '+id);

    return data;
  }

  async create(dto: CreateTravelReasonDto): Promise<{ message: string }> {
    const data = this.repositoryTravelReason.create(dto);

    await this.repositoryTravelReason.save(data);

    return { message: 'Viático registrado exitosamente' };
  }

  async update(id: string, dto: UpdateTravelReasonDto): Promise<{message: string} | NotFoundException>{
    const data = await this.findOne(id);
  
    if (!data) throw new NotFoundException({ message: 'No existe el viático solicitado' });

    await this.repositoryTravelReason.update(id, dto);
  
    return { message: 'Viático actualizado exitosamente' };
  } 

  async remove(id: string): Promise<{message: string}>{
    await this.findOne(id);

    await this.repositoryTravelReason.delete(id);

    return {message: 'Viático eliminado exitosamente'};
  }
}