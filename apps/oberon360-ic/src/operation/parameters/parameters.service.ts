import { Injectable, Logger } from '@nestjs/common';
import { OperationalParameters } from '@prisma/client';
import { UtilsService } from '../../utils/utils.service';

@Injectable()
export class ParametersService {
  constructor(private prisma: UtilsService) {}

  async getOperationParametersByListId(
    listId: number,
  ): Promise<OperationalParameters[]> {
    try {
      return await this.prisma.operationalParameters.findMany({
        where: {
          listId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(ParametersService.name);
}
