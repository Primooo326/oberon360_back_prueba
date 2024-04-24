import { Injectable } from '@nestjs/common';
import { UtilsService } from '../../utils/utils.service';
import { Parameters } from '@prisma/client';

@Injectable()
export class ParametersService {
  constructor(private prisma: UtilsService) {}

  async create(parameter: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: parameter,
      });
      return 'Parametro creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listParameters(): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({});
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParametersByGroup(groupId: number): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        select: {
          id: true,
          groupId: true,
          parameterGroupId: {
            select: {
              groupName: true,
            },
          },
          value: true,
          valueType: true,
          fatherParameter: true,
          metaCode: true,
          isParametric: true,
          customerId: true,
          createdAt: true,
          updatedAt: true,
          status: true,
        },
        where: {
          groupId,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParametersByGroupSegmentByFather(
    groupId: number,
    fatherId: number,
  ): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        select: {
          id: true,
          groupId: true,
          parameterGroupId: {
            select: {
              groupName: true,
            },
          },
          value: true,
          valueType: true,
          fatherParameter: true,
          metaCode: true,
          isParametric: true,
          customerId: true,
          createdAt: true,
          updatedAt: true,
          status: true,
        },
        where: {
          groupId,
          fatherParameter: fatherId,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async edit(parameterId: number, parameter: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.update({
        where: {
          id: parameterId,
        },
        data: parameter,
      });
      return 'Parametro actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(parameters: Parameters[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameters.createMany({
        data: parameters,
      });
      return `${resultResume.count} parametros creado correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(parameterId: number): Promise<string> {
    try {
      await this.prisma.parameters.delete({
        where: {
          id: parameterId,
        },
      });
      return 'Parametro eliminado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }
}
