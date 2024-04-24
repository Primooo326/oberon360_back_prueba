import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Studies, Request as RequestPrismaObject } from '@prisma/client';
import { UtilsService } from '../../utils/utils.service';
import { HelpersService } from '../../utils/helpers.service';
import { MailService } from '../../utils/mail/mail.service';
import { CustomersService } from '../customers/customers.service';
import { RequestCustom } from '../../types/Requests';
import { RequestStatus } from '../../types/RequestStatus';
import { StudiesStatus } from '../../types/StudiesStatus';
import IMailOptions from '../../types/MailOptions';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(
    private prisma: UtilsService,
    private helpers: HelpersService,
    private readonly mailService: MailService,
    private customersService: CustomersService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async list(): Promise<any[]> {
    try {
      const listCustomers = await this.customersService.getCustomersList();
      const operationalGroupInfo =
        await this.prisma.operationalGroups.findFirst({
          include: {
            OperationalGroupsTeams: {
              where: {
                userId: this.request.user.id,
              },
            },
            OperationalGroupsCustomers: true,
          },
        });
      const list = await this.prisma.request.findMany({
        where: {
          customerId: {
            in: operationalGroupInfo.OperationalGroupsCustomers.map(
              (group) => group.customerId,
            ),
          },
        },
        select: {
          id: true,
          creationDate: true,
          cancellationDate: true,
          submitDate: true,
          customerId: true,
          customerInternal: true,
          costCenterId: true,
          regional: true,
          billable: true,
          status: true,
          remarks: true,
          RequestCandidates: {
            select: {
              candidate: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  charge: true,
                },
              },
            },
          },
          RequestServices: {
            select: {
              serviceId: true,
              servicePackage: true,
            },
          },
        },
        orderBy: {
          creationDate: 'desc',
        },
      });
      const mappedData = list.map((request) => {
        return {
          id: request.id,
          creationDate: request.creationDate,
          submitDate: request.submitDate,
          cancellationDate: request.cancellationDate,
          customer: {
            id: request.customerId,
            name: listCustomers.data.find(
              (customer: any) =>
                customer.cliente_ID === String(request.customerId),
            ).cliente_Nombre,
          },
          client: request.customerInternal,
          costCenterId: request.costCenterId,
          regional: request.regional,
          billable: request.billable,
          status: request.status,
          remarks: request.remarks,
          candidates: request.RequestCandidates,
          services: request.RequestServices.map((service) => {
            return {
              serviceId: service.serviceId,
              servicePackage: service.servicePackage,
            };
          }),
        };
      });
      return mappedData;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async create(request: RequestCustom): Promise<string> {
    try {
      const listCustomers = await this.customersService.getCustomersList();
      const validateOperationalGroup =
        await this.prisma.operationalGroupsCustomers.findFirst({
          where: {
            customerId: request.customerId,
          },
          select: {
            customerId: true,
            groupId: true,
            id: true,
            group: {
              select: {
                id: true,
                name: true,
                leader: true,
                active: true,
              },
            },
          },
        });
      if (validateOperationalGroup) {
        const requestToGenerate = {
          customerId: request.customerId,
          customerInternal: request.customerInternal,
          costCenterId: request.costCenterId,
          regional: request.regional,
          billable: request.billable,
          remarks: request.remarks,
          status:
            request.saveType === 'save'
              ? RequestStatus.REGISTERED
              : RequestStatus.SUBMIT,
          createdBy: this.request.user.id,
          updatedBy: this.request.user.id,
        } as RequestPrismaObject;
        if (request.saveType === 'saveAndSubmit') {
          requestToGenerate.submitDate = new Date();
          requestToGenerate.submitBy = this.request.user.id;
        }
        const requestCreated = await this.prisma.request.create({
          data: requestToGenerate,
        });
        const mappedServices = request.services.map((service) => {
          const serviceMapped: any = {
            requestId: requestCreated.id,
          };
          service.isPackage === true
            ? (serviceMapped.servicePackage = service.id)
            : (serviceMapped.serviceId = service.id);
          return serviceMapped;
        });
        await this.prisma.requestServices.createMany({
          data: mappedServices,
        });
        const listCandidates = await this.prisma.candidate.findMany();
        new Promise(async (resolve, reject) => {
          let candidatesSuccess = [];
          const generatePassword = await this.helpers.hashPassword(
            process.env.DEFAULT_PASSWORD,
          );
          for await (const candidate of request.candidates) {
            const candidateFind = listCandidates.find(
              (cand) => cand.username === candidate.username,
            );
            if (candidateFind) {
              await this.prisma.candidate.update({
                where: {
                  id: candidateFind.id,
                },
                data: {
                  password: generatePassword,
                  email:
                    candidateFind.email !== candidate.email
                      ? candidate.email
                      : candidateFind.email,
                  charge:
                    candidateFind.charge !== candidate.charge
                      ? candidate.charge
                      : candidateFind.charge,
                },
              });
              if (request.saveType === 'saveAndSubmit') {
                this.sendCandidateMail(
                  candidateFind.email !== candidate.email
                    ? candidate.email
                    : candidateFind.email,
                  candidateFind.username,
                  process.env.DEFAULT_PASSWORD,
                  Number(request.customerId),
                );
              }
              candidatesSuccess.push({
                candidateId: candidateFind.id,
                requestId: requestCreated.id,
              });
            } else {
              try {
                const candidateSaved = await this.prisma.candidate.create({
                  data: {
                    username: candidate.username,
                    name: candidate.name,
                    customerId: request.customerId,
                    email: candidate.email,
                    password: generatePassword,
                    charge: candidate.charge,
                    status: candidate.status,
                  },
                });
                if (request.saveType === 'saveAndSubmit') {
                  this.sendCandidateMail(
                    candidateSaved.email,
                    candidateSaved.username,
                    process.env.DEFAULT_PASSWORD,
                    Number(request.customerId),
                  );
                }
                candidatesSuccess.push({
                  candidateId: candidateSaved.id,
                  requestId: requestCreated.id,
                });
              } catch (error) {
                this.logger.error(error);
                reject(error);
              }
            }
          }
          resolve(candidatesSuccess);
        })
          .then(async (mappedCandidates: any) => {
            await this.prisma.requestCandidates.createMany({
              data: mappedCandidates,
            });
            if (request.saveType === 'saveAndSubmit') {
              const studiesToCreation = [];
              request.services.map((service, index) => {
                if (service.isPackage) {
                  listCustomers.data
                    .find(
                      (customer: any) =>
                        customer.cliente_ID === String(request.customerId),
                    )
                    .paquetes.find(
                      (paquete: any) => paquete.paquete_ID === service.id,
                    )
                    .servicios.map((servicePerPackage: any) => {
                      mappedCandidates.map((candidate) => {
                        studiesToCreation.push({
                          serviceId: Number(servicePerPackage.servicio_ID),
                          requestId: requestCreated.id,
                          candidateId: Number(candidate.candidateId),
                          status: StudiesStatus.UNASSIGNED,
                          AdvantageOfProgress: 0,
                          LeadAnalystId: validateOperationalGroup.group.leader,
                        });
                      });
                    });
                } else {
                  mappedCandidates.map((candidate) => {
                    studiesToCreation.push({
                      serviceId: Number(service.id),
                      requestId: requestCreated.id,
                      candidateId: Number(candidate.candidateId),
                      status: StudiesStatus.UNASSIGNED,
                      AdvantageOfProgress: 0,
                      LeadAnalystId: validateOperationalGroup.group.leader,
                    });
                  });
                }
              });
              await this.prisma.studies.createMany({
                data: studiesToCreation as Studies[],
              });
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
        return 'Solicitud creada correctamente';
      } else {
        throw new Error(
          'No se ha podido crear la solicitud porque no existe un grupo operacional creado para este cliente',
        );
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async submitRequest(requestId: number, customerId: number): Promise<string> {
    try {
      const listCustomers = await this.customersService.getCustomersList();
      await this.prisma.request.update({
        where: {
          id: requestId,
        },
        data: {
          submitBy: this.request.user.id,
          submitDate: new Date(),
          status: RequestStatus.SUBMIT,
        },
      });
      const operationalGroup =
        await this.prisma.operationalGroupsCustomers.findFirst({
          where: {
            customerId: customerId,
          },
          select: {
            customerId: true,
            groupId: true,
            id: true,
            group: {
              select: {
                id: true,
                name: true,
                leader: true,
                active: true,
              },
            },
          },
        });
      const listCandidates = await this.prisma.requestCandidates.findMany({
        where: {
          requestId,
        },
        select: {
          candidate: true,
        },
      });
      const listServices = await this.prisma.requestServices.findMany({
        where: {
          requestId,
        },
        select: {
          serviceId: true,
          servicePackage: true,
        },
      });
      const studiesToCreation = [];
      listServices.map((service) => {
        if (service.servicePackage !== null) {
          listCustomers.data
            .find((customer: any) => customer.cliente_ID === String(customerId))
            .paquetes.find(
              (paquete: any) => paquete.paquete_ID === service.servicePackage,
            )
            .servicios.map((servicePerPackage: any) => {
              listCandidates.map((candidate) => {
                studiesToCreation.push({
                  serviceId: Number(servicePerPackage.servicio_ID),
                  requestId: requestId,
                  candidateId: candidate.candidate.id,
                  status: StudiesStatus.UNASSIGNED,
                  AdvantageOfProgress: 0,
                  LeadAnalystId: operationalGroup.group.leader,
                });
              });
            });
        } else {
          listCandidates.map((candidate) => {
            studiesToCreation.push({
              serviceId: Number(service.serviceId),
              requestId: requestId,
              candidateId: candidate.candidate.id,
              status: StudiesStatus.UNASSIGNED,
              AdvantageOfProgress: 0,
              LeadAnalystId: operationalGroup.group.leader,
            });
          });
        }
      });
      await this.prisma.studies.createMany({
        data: studiesToCreation,
      });
      listCandidates.map((requestCandidate) => {
        this.sendCandidateMail(
          requestCandidate.candidate.email,
          requestCandidate.candidate.username,
          process.env.DEFAULT_PASSWORD,
          Number(customerId),
        );
      });
      return 'Solicitud radicada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async update(): Promise<string> {
    try {
      return '';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async delete(requestId: number): Promise<string> {
    try {
      await this.prisma.request.update({
        where: {
          id: requestId,
        },
        data: {
          cancelledBy: this.request.user.id,
          cancellationDate: new Date(),
          status: RequestStatus.CANCELLED,
          isActive: false,
        },
      });
      return 'Solicitud anulada correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private sendCandidateMail = async (
    emailNotification: string,
    username: string,
    password: string,
    customerId: number,
  ) => {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, '../../../templates/email/welcomeCandidate.hbs'),
      'utf8',
    );
    const customerLogo = await this.prisma.customerLogos.findUnique({
      where: { customerId },
    });
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      username,
      password,
      customerImageName:
        customerLogo && customerLogo.imagePathName
          ? customerLogo.imagePathName
          : '',
    });
    const mailOptions: IMailOptions = {
      from: 'Oberón <oberon@thomasseguridadintegral.com>',
      to: emailNotification,
      subject: 'Ingreso modulo candidatos',
      html: htmlToSend,
    };
    await this.mailService.sendEmail(mailOptions);
  };

  private readonly logger = new Logger(RequestService.name);
}
