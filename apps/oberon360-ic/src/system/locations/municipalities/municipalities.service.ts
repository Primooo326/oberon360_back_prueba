import { Injectable } from '@nestjs/common';
import { Parameters } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class MunicipalitiesService {
  constructor(private prisma: UtilsService) {}

  async create(municipality: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: municipality,
      });
      return 'Municipio creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listMunicipalities(): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          groupId: 11,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMunicipalitiesByDepartmentId(
    departmentId: number,
  ): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          fatherParameter: departmentId,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMunicipalitiesByCountryId(countryId: number): Promise<Parameters[]> {
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

  async edit(municipality: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.update({
        where: {
          id: municipality.id,
        },
        data: municipality,
      });
      return 'Municipio actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(deparments: Parameters[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameters.createMany({
        data: deparments,
      });
      return `${resultResume.count} Municipios creados correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
