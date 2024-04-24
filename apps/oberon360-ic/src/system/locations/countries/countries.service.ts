import { Injectable } from '@nestjs/common';
import { Parameters } from '@prisma/client';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable()
export class CountriesService {
  constructor(private prisma: UtilsService) {}

  async create(country: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: country,
      });
      return 'País creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listCountries(): Promise<Parameters[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        where: {
          groupId: 9,
        },
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async edit(country: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.update({
        where: {
          id: country.id,
        },
        data: country,
      });
      return 'País actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(countries: Parameters[]): Promise<string> {
    try {
      const resultResume = await this.prisma.parameters.createMany({
        data: countries,
      });
      return `${resultResume.count} Paises creados correctamente`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
