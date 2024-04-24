import { Injectable } from '@nestjs/common';
import { Parameters } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: UtilsService) {}

  async create(department: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: department,
      });
      return 'Departamento creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listDepartments(): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          groupId: 10,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDepartmentsByCountry(countryId: number): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          fatherParameter: countryId,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async edit(department: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.update({
        where: {
          id: department.id,
        },
        data: department,
      });
      return 'Departamento actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(deparments: Parameters[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameters.createMany({
        data: deparments,
      });
      return `${resultResume.count} Departamentos creados correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
