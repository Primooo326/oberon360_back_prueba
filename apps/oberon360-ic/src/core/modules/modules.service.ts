import { Injectable, Logger } from '@nestjs/common';
import { Modules } from '@prisma/client';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: UtilsService) {}

  async getModules(): Promise<Modules[]> {
    try {
      return await this.prisma.modules.findMany();
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(ModulesService.name);
}
