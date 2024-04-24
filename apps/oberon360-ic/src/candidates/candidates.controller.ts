import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { Candidate } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/auth/jwt-auth.guard';
import IResponse from '../types/IResponse';

@Controller('candidates')
@UseGuards(JwtAuthGuard)
@ApiTags('Candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post('createCandidate')
  async createcandidate(@Body() candidate: Candidate): Promise<IResponse> {
    try {
      const responseService = await this.candidatesService.create(candidate);
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getCandidates')
  async getcandidates(): Promise<IResponse> {
    try {
      const responseService = await this.candidatesService.listCandidates();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Put('updatePassword')
  async updatecandidatePassword(@Body() body: any): Promise<IResponse> {
    try {
      const responseService = await this.candidatesService.updatePassword({
        currentPassword: body.currentPassword,
        password: body.password,
      });
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Put('updateCandidate/:id')
  async updatecandidate(
    @Param('id') id: string,
    @Body() candidate: Candidate,
  ): Promise<IResponse> {
    try {
      const responseService = await this.candidatesService.updateCandidate(
        Number(id),
        candidate,
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Delete('deleteCandidate/:id')
  async deletecandidate(@Param('id') id: string): Promise<IResponse> {
    try {
      const responseService = await this.candidatesService.deleteCandidate(
        Number(id),
      );
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }

  @Get('getServicesScheduled')
  async getServicesScheduled(): Promise<IResponse> {
    try {
      const responseService =
        await this.candidatesService.getServicesScheduled();
      return {
        status: 'success',
        data: responseService,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message ? JSON.parse(error.message) : error,
      });
    }
  }
}
