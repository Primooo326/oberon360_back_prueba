import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../core/auth/jwt-auth.guard';

@Controller('integrations')
@UseGuards(JwtAuthGuard)
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  /*@Get('docusign/sign')
  async generateSigning(@Query() query: any): Promise<IResponse> {
    try {
      const jwtAuthResponse =
        await this.integrationsService.authenticateJwtApp();
      const args = {
        accessToken: jwtAuthResponse.accessToken,
        basePath: jwtAuthResponse.basePath,
        accountId: jwtAuthResponse.apiAccountId,
        signerEmail: query.signerEmail,
        signerName: query.signerName,
      };
      const responseService = await this.integrationsService.generateSigning(
        args,
      );
      return { status: 'success', data: responseService };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? error.message : error,
      });
    }
  }*/
}
