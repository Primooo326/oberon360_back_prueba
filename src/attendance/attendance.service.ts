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
    @InjectRepository(Schedules, 'COP') private repositorySchedules: Repository<Schedules>,
    @InjectRepository(Attendance, 'ICP') private repositoryAttendance: Repository<Attendance>,
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

  async findAttendance(): Promise<any> {
    let data1 = await this.repositoryAttendance.createQueryBuilder("query")
      .select(['query.ASISTENCIA_ID'])
      .getCount();

    let data2 = await this.repositorySchedules.createQueryBuilder("query2")
      .select(['query2.HORA_ID'])
      .getCount();

    return {
      data1, data2
    };
  }
}