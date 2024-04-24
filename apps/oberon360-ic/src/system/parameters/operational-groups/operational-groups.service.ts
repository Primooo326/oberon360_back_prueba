import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CustomersService } from 'apps/oberon360-ic/src/operation/customers/customers.service';
import { OperationalGroupsRequest } from 'apps/oberon360-ic/src/types/Requests';
import { UtilsService } from 'apps/oberon360-ic/src/utils/utils.service';

@Injectable({ scope: Scope.REQUEST })
export class OperationalGroupsService {
  constructor(
    private prisma: UtilsService,
    private readonly customersService: CustomersService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async create(group: OperationalGroupsRequest): Promise<string> {
    try {
      const groupCreated = await this.prisma.operationalGroups.create({
        data: {
          name: group.name,
          leader: group.leader,
          active: group.active,
        },
      });
      const team = group.team.map((user) => {
        return {
          userId: user,
          groupId: groupCreated.id,
        };
      });
      const customers = group.customers.map((customer) => {
        return {
          customerId: customer,
          groupId: groupCreated.id,
        };
      });
      await this.prisma.operationalGroupsTeams.createMany({
        data: team,
      });
      await this.prisma.operationalGroupsCustomers.createMany({
        data: customers,
      });
      return 'Grupo operacional creado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async listOperationalGroups(): Promise<any[]> {
    try {
      const list = await this.prisma.operationalGroups.findMany({
        select: {
          id: true,
          name: true,
          active: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          OperationalGroupsTeams: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          OperationalGroupsCustomers: {
            select: {
              customerId: true,
            },
          },
        },
      });
      const customers = await this.customersService.getCustomersList();
      const operationalGroups = list.map((group) => {
        return {
          id: group.id,
          name: group.name,
          leader: group.user,
          team: group.OperationalGroupsTeams,
          customers: group.OperationalGroupsCustomers.map((customer) => {
            return {
              customer: {
                id: customer.customerId,
                name: customers.data.find(
                  (cus) => cus.cliente_ID === String(customer.customerId),
                ).cliente_Nombre,
              },
            };
          }),
          active: group.active,
        };
      });
      return operationalGroups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCustomerOperationalGroupByUser(userId: number): Promise<any> {
    try {
      const customers = await this.customersService.getCustomersList();
      const list = (await this.prisma.$queryRaw`
        SELECT
        OG.id, OG.name as groupName, OGC.customerId, UL.id as leaderId, UL.name as leaderName, UT.id as userId, UT.name as userName
        FROM [OperationalGroups] OG
        LEFT JOIN [OperationalGroupsTeams] as OGT on OGT.groupId=OG.id
        INNER JOIN [OperationalGroupsCustomers] as OGC ON OGC.groupId=OG.id
        LEFT JOIN [User] as UL ON UL.id=OG.leader
        LEFT JOIN [User] as UT ON UT.id=OGT.userId
        WHERE OG.leader = ${userId} OR EXISTS (
          SELECT 1
          FROM [User] U
          WHERE U.id=OGT.userId
        )        
      `) as any[];
      const formattedList = list.reduce((acc, row) => {
        const {
          id: groupID,
          groupName,
          customerId,
          leaderId,
          leaderName,
          userId,
          userName,
        } = row;
        // Si el objeto aún no ha sido creado, inicialízalo
        if (!acc.groupID) {
          acc.groupID = groupID;
          acc.groupName = groupName;
          acc.leader = {
            id: leaderId,
            name: leaderName,
          };
          acc.customers = [];
          acc.team = [];
        }
        // Agregar cliente del grupo
        if (
          !acc.customers.find((customer: any) => customer.id === customerId)
        ) {
          acc.customers.push({
            id: customerId,
            name: customers.data.find(
              (cust: any) => cust.cliente_ID === String(customerId),
            ).cliente_Nombre,
          });
        }
        // Agregar cada miembro al equipo
        if (!acc.team.find((user: any) => user.id === userId)) {
          acc.team.push({
            id: userId,
            name: userName,
          });
        }
        return acc;
      }, {});
      return formattedList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async edit(
    groupId: number,
    group: OperationalGroupsRequest,
  ): Promise<string> {
    try {
      await this.prisma.operationalGroups.update({
        where: {
          id: groupId,
        },
        data: {
          name: group.name,
          leader: group.leader,
          active: group.active,
        },
      });
      await this.prisma.operationalGroupsTeams.deleteMany({
        where: {
          groupId,
        },
      });
      await this.prisma.operationalGroupsCustomers.deleteMany({
        where: {
          groupId,
        },
      });
      const team = group.team.map((user) => {
        return {
          userId: user,
          groupId: groupId,
        };
      });
      const customers = group.customers.map((customer) => {
        return {
          customerId: customer,
          groupId: groupId,
        };
      });
      await this.prisma.operationalGroupsTeams.createMany({
        data: team,
      });
      await this.prisma.operationalGroupsCustomers.createMany({
        data: customers,
      });
      return 'Grupo operacional actualizado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(groupId: number): Promise<string> {
    try {
      await this.prisma.operationalGroupsCustomers.deleteMany({
        where: {
          groupId,
        },
      });
      await this.prisma.operationalGroupsTeams.deleteMany({
        where: {
          groupId,
        },
      });
      await this.prisma.operationalGroups.delete({
        where: {
          id: groupId,
        },
      });
      return 'Grupo operacional eliminado correctamente';
    } catch (error) {
      throw new Error(error);
    }
  }
}
