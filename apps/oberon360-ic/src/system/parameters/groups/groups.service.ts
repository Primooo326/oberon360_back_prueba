import { Injectable } from '@nestjs/common';
import { ParametersGroups } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: UtilsService) {}

  async listParameterGroups(): Promise<ParametersGroups[]> {
    try {
      const list = await this.prisma.parametersGroups.findMany({
        orderBy: { order: 'asc' },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }
}
