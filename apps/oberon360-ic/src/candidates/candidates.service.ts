import { Inject, Injectable, Scope, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Candidate, Programmes } from '@prisma/client';
import { UtilsService } from '../utils/utils.service';
import { HelpersService } from '../utils/helpers.service';

@Injectable({ scope: Scope.REQUEST })
export class CandidatesService {
  constructor(
    private prisma: UtilsService,
    private helpers: HelpersService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async create(candidate: Candidate): Promise<string> {
    try {
      await this.prisma.candidate.create({
        data: {
          username: candidate.username,
          name: candidate.name,
          customerId: candidate.customerId,
          email: candidate.email,
          password: await this.helpers.hashPassword(
            process.env.DEFAULT_PASSWORD,
          ),
          status: candidate.status,
        },
      });
      return 'Candidato creado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadMany(candidates: Candidate[]): Promise<string> {
    try {
      candidates.map(
        async (candidate: Candidate) =>
          (candidate.password = await this.helpers.hashPassword(
            process.env.DEFAULT_PASSWORD,
          )),
      );
      await this.prisma.candidate.createMany({
        data: candidates,
      });
      return 'Candidatos cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async listCandidates(): Promise<any[]> {
    try {
      const list = (await this.prisma.candidate.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          lastLogin: true,
          status: true,
        },
      })) as any[];
      return list;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async updatePassword({ currentPassword, password }): Promise<string> {
    try {
      const candidateFinded = await this.prisma.candidate.findUnique({
        where: {
          id: this.request.user.id,
        },
      });
      if (
        await this.helpers.compareHashPassword(
          currentPassword,
          candidateFinded.password,
        )
      ) {
        const newPassword = await this.helpers.hashPassword(password);
        await this.prisma.candidate.update({
          where: {
            id: this.request.user.id,
          },
          data: { password: newPassword },
        });
        return 'Contraseña actualizada correctamente';
      } else {
        throw new Error('La contrasea actual no es correcta');
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async updateCandidate(
    candidateId: number,
    candidate: Candidate,
  ): Promise<string> {
    try {
      await this.prisma.candidate.update({
        where: {
          id: candidateId,
        },
        data: candidate,
      });
      return 'Usuario actualizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async deleteCandidate(candidateId: number): Promise<string> {
    try {
      await this.prisma.candidate.delete({
        where: {
          id: candidateId,
        },
      });
      return 'Usuario eliminado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getServicesScheduled(): Promise<any> {
    try {
      const servicesScheduled = await this.prisma.$queryRaw`
      SELECT
      p.id, p.candidateId, p.dateTimeEvent, p.status, p.additionalInformation,
      p.serviceId, sts.studyTypeId, st.itsAVisit, st.itsAPolygraph, st.name,
      sts.canBeTakenVirtual
      FROM [dbo].[Programmes] p
      INNER JOIN [dbo].[StudyTypesFromServices] sts on sts.serviceId=p.serviceId
      INNER JOIN [dbo].[StudyTypes] st on st.id=sts.studyTypeId
      WHERE candidateId = ${this.request.user.id}`;
      return servicesScheduled;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(CandidatesService.name);
}
