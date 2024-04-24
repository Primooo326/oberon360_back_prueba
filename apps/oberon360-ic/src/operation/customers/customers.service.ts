import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, take } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { UtilsService } from '../../utils/utils.service';
import { CustomerResponse } from '../../types/CustomerResponse';
import { CustomerParameters, CustomerParameterType } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class CustomersService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: UtilsService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async getAPIToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService
          .post(`${this.vigilantesApi}/Vigilantes/api/Login`, {
            userName: process.env.VIGILANTES_USER_CREDENTIALS,
            password: process.env.VIGILANTES_PASSWORD_CREDENTIALS,
          })
          .pipe(take(1))
          .subscribe((response: AxiosResponse) => {
            const authToken = response.data.token.result.token;
            this.logger.log('Token de autenticación obtenido con éxito.');
            resolve(authToken);
          });
      } catch (error) {
        this.logger.error(
          'Error al obtener el token de autenticación',
          error.message ? error.message : error,
        );
        reject(JSON.stringify({ message: error }));
      }
    });
  }

  async getCustomersList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const authToken = await this.getAPIToken();
        return this.httpService
          .get(`${this.vigilantesApi}/Vigilantes/api/Nuawi`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .pipe(take(1))
          .subscribe((response: any) => {
            const customersList: CustomerResponse[] = response.data;
            const processListCustomers = this.organizeCustomers(customersList);
            this.logger.log(
              'Listado clientes control operativo cargado correctamente.',
            );
            resolve({
              data: processListCustomers,
              total: processListCustomers.length,
            });
          });
      } catch (error) {
        this.logger.error(error.message ? error.message : error);
        reject(
          JSON.stringify({
            message: `Error al obtener listado de clientes: ${error}`,
          }),
        );
      }
    });
  }

  async getCustomerInfo(customerId: String): Promise<any> {
    try {
      const customers = await this.getCustomersList();
      const customerSelected = customers.data.find(
        (customer: any) => customer.cliente_ID === customerId,
      );
      let parameters = await this.prisma.customerParameters.groupBy({
        by: [
          'id',
          'customerParameterTypeId',
          'internalCode',
          'name',
          'isDefault',
        ],
        where: {
          customerId: Number(customerSelected.cliente_ID),
        },
      });
      const groupedParameters = {};
      parameters.forEach((parameter) => {
        const typeId = parameter.customerParameterTypeId;
        if (!groupedParameters[typeId]) {
          groupedParameters[typeId] = {
            customerParameterTypeId: typeId,
            values: [],
          };
        }
        groupedParameters[typeId].values.push({
          id: parameter.id,
          internalCode: parameter.internalCode,
          name: parameter.name,
          isDefault: parameter.isDefault,
        });
      });

      return {
        ...customerSelected,
        parameters: Object.values(groupedParameters),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCustomerParamTypes(): Promise<CustomerParameterType[]> {
    try {
      const parameterTypesList =
        await this.prisma.customerParameterType.findMany({});
      return parameterTypesList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createNewParam(param: CustomerParameters): Promise<string> {
    try {
      await this.prisma.customerParameters.create({
        data: param,
      });
      return 'Parametro creado correctamente.';
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParamsByGroupInCustomer(
    customerId: number,
    groupId: number,
  ): Promise<CustomerParameters[]> {
    try {
      const parametersList = await this.prisma.customerParameters.findMany({
        where: {
          customerId,
          customerParameterTypeId: groupId,
        },
        select: {
          id: true,
          name: true,
          status: true,
          loadDate: true,
          isDefault: true,
          internalCode: true,
          customerId: true,
          customerParameterTypeId: true,
          customerParameterType: {
            select: {
              name: true,
            },
          },
        },
      });
      return parametersList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateParam(param: CustomerParameters): Promise<string> {
    try {
      await this.prisma.customerParameters.update({
        where: {
          id: param.id,
        },
        data: param,
      });
      return 'Parametro actualizado correctamente.';
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteParam(paramId: number): Promise<string> {
    try {
      await this.prisma.customerParameters.delete({
        where: {
          id: paramId,
        },
      });
      return 'Parametro eliminado correctamente.';
    } catch (error) {
      throw new Error(error);
    }
  }

  private organizeCustomers(data: CustomerResponse[]) {
    const result = [];
    const clientMap = new Map();
    data.forEach((item: CustomerResponse) => {
      const clienteID = item.cliente_ID;
      const paqueteID = item.paqueteS_Paquete_ID;
      const servicioID = item.servicioS_Servicio_ID;
      if (!clientMap.has(clienteID)) {
        const client = {
          cliente_ID: clienteID,
          cliente_Nombre: item.cliente_Nombre,
          servicios: [],
          paquetes: [],
        };
        clientMap.set(clienteID, client);
        result.push(client);
      }
      const client = clientMap.get(clienteID);
      if (paqueteID === null) {
        client.servicios.push({
          servicio_Descripcion: item.servicioS_Servicio_Descripcion,
          servicio_ID: item.servicioS_Servicio_ID,
        });
      } else if (paqueteID !== null && servicioID === null) {
        const paqueteMatch = client.paquetes.find(
          (p) => p.paquete_ID === paqueteID,
        );
        if (paqueteMatch) {
          paqueteMatch.servicios.push({
            servicio_Descripcion: item.paqueteS_Servicio_Descripcion,
            servicio_ID: item.paqueteS_Servicio_ID,
          });
        } else {
          const paquete = {
            paquete_ID: paqueteID,
            paquete_Nombre: item.paqueteS_Paquete_Nombre,
            servicios: [
              {
                servicio_Descripcion: item.paqueteS_Servicio_Descripcion,
                servicio_ID: item.paqueteS_Servicio_ID,
              },
            ],
          };
          client.paquetes.push(paquete);
        }
      }
    });
    return result;
  }

  private readonly logger = new Logger(CustomersService.name);

  vigilantesApi = process.env.VIGILANTES_API;
}
