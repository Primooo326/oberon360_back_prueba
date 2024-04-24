import { Injectable } from '@nestjs/common';
import { Parameters } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class DistrictsService {
  constructor(private prisma: UtilsService) {}

  async create(district: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: district,
      });
      return 'Barrio creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listDistricts(): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          groupId: 13,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDistrictsByMunicipality(
    municipalityId: number,
  ): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          fatherParameter: municipalityId,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async edit(district: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.update({
        where: {
          id: district.id,
        },
        data: district,
      });
      return 'Barrio actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(districts: Parameters[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameters.createMany({
        data: districts,
      });
      return `${resultResume.count} Barrios creados correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
