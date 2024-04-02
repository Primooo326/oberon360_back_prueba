import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedules } from './entities/schedules.entity';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Schedules, 'default') private repositorySchedules: Repository<Schedules>,
    @InjectRepository(Attendance, 'invesConnection') private repositoryAttendance: Repository<Attendance>,
  ) { }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateAttendanceDto>> {
    const queryBuilder = await this.repositorySchedules.createQueryBuilder("COP101_HORARIOS_ACTUAL");

    queryBuilder
        .orderBy("COP101_HORARIOS_ACTUAL.HORA_ID", pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.repositorySchedules.createQueryBuilder("attendance")
      .where("attendance.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe un dato con el id '+id);
    
    return data;
  }

  async create(dto: CreateAttendanceDto): Promise<any> {
    const data = this.repositorySchedules.create(dto);
    await this.repositorySchedules.save(data);

    return {message: 'Información registrada exitosamente'};
  }

  async update(id:number, dto: CreateAttendanceDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe la información solicitada'});

    await this.repositorySchedules.update(id, dto);
    
    return {message: 'Información actualizada exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.repositorySchedules.delete(id);

    return {message: 'Información eliminada exitosamente'};
  }

  async findAttendance(): Promise<any> {
    const data1 = await this.repositoryAttendance.createQueryBuilder("query")
      .select(['query.ASISTENCIA_ID'])
      .getOne();

    const data2 = await this.repositorySchedules.createQueryBuilder("query2")
      .select(['query2.HORA_ID'])
      .getOne();

    return {
      data1, data2
    };
  }
}