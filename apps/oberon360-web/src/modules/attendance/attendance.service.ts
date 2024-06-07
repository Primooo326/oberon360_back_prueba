import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcpAttendance } from './entities/icp-attendance.entity';
import { PageOptionsDto } from 'apps/oberon360-api/src/dtos-globals/page-options.dto';
import { PageDto } from 'apps/oberon360-api/src/dtos-globals/page.dto';
import { FilterOptionsDto } from './dto/filter-options.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(IcpAttendance, 'ICP') private repositoryIcpAttendance: Repository<IcpAttendance>,
  ) { }

  async findAttendance(pageOptionsDto: PageOptionsDto, filterOptionsDto: FilterOptionsDto): Promise<PageDto<CreateAttendanceDto>> 
  {
    const { term, page, take } = pageOptionsDto;

    const dateInit = filterOptionsDto.dateInit ? filterOptionsDto.dateInit : '2024-05-01';
    const dateEnd = filterOptionsDto.dateEnd ? filterOptionsDto.dateEnd : '2024-06-07';
    
    try {
      const data = await this.repositoryIcpAttendance.query('EXEC SP1182_GET_COP023_ASISTENCIA_V2 @FechaInicio = @0, @FechaFinal = @1, @term = @2', [dateInit, dateEnd, term]);
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