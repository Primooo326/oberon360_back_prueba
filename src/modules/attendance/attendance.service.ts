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
    @InjectRepository(Attendance, 'ICP') private repositoryAttendance: Repository<Attendance>,
  ) { }

  async findAttendance(pageOptionsDto: PageOptionsDto): Promise<PageDto<CreateAttendanceDto>> {
    const { term, page, take } = pageOptionsDto;
    try {
      const data = await this.repositoryAttendance.query('EXEC SP1182_GET_COP023_ASISTENCIA @FechaInicio = @0, @FechaFinal = @1, @term = @2', ['', '', term]);
      const itemCount = data.length;
      const skip = (page - 1) * take;
      const pageData = data.slice(skip, skip + take);

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data: pageData,
        meta: {
          page,
          take,
          itemCount,
          pageCount,
          hasPreviousPage,
          hasNextPage,
        },
      };
    } catch (error) {
      throw new Error(`Error calling stored procedure: ${error.message}`);
    }
  }
}