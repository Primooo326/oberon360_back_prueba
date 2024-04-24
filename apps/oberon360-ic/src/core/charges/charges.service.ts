import { Injectable, Logger } from '@nestjs/common';
import { UtilsService } from '../../utils/utils.service';
import { Parameters } from '@prisma/client';

@Injectable()
export class ChargesService {
  constructor(private prisma: UtilsService) {}

  async create(charge: Parameters): Promise<string> {
    try {
      await this.prisma.parameters.create({
        data: charge,
      });
      return 'Cargo creado correctamente';
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2002') {
        throw new Error(
          JSON.stringify({
            code: error.code,
            message: 'El nombre del cargo ya existe',
          }),
        );
      } else {
        throw new Error(
          JSON.stringify({ code: error.code, message: error.message }),
        );
      }
    }
  }

  async listCharges(): Promise<any[]> {
    try {
      const list = await this.prisma.parameters.findMany({
        select: {
          id: true,
          value: true,
          status: true,
        },
        where: {
          groupId: 8,
        },
      });
      return list;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getById(chargeId: number): Promise<any> {
    try {
      const chargeFind = await this.prisma.parameters.findUnique({
        where: {
          id: chargeId,
        },
        select: {
          id: true,
          value: true,
          status: true,
        },
      });
      return chargeFind;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async update(charge: Parameters): Promise<string> {
    try {
      charge.updatedAt = new Date();
      await this.prisma.parameters.update({
        where: {
          id: charge.id,
        },
        data: charge,
      });
      return 'Cargo actualizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async delete(chargeId: number): Promise<string> {
    try {
      await this.prisma.parameters.delete({
        where: {
          id: chargeId,
        },
      });
      return 'Cargo elimiado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(ChargesService.name);
}
