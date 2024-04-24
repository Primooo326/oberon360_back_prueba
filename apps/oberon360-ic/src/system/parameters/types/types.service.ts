import { Injectable } from '@nestjs/common';
import { ParameterValueType } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class TypesService {
  constructor(private prisma: UtilsService) {}

  async create(type: ParameterValueType): Promise<string> {
    try {
      await this.prisma.parameterValueType.create({
        data: type,
      });
      return 'Tipo de parametro creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listParameterTypes(): Promise<ParameterValueType[]> {
    try {
      const list = await this.prisma.parameterValueType.findMany({});
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(types: ParameterValueType[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameterValueType.createMany({
        data: types,
      });
      return `${resultResume.count} tipos creado correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
