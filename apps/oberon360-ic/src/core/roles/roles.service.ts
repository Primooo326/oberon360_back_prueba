import { Injectable, Logger } from '@nestjs/common';
import { UtilsService } from '../../utils/utils.service';
import { RolesCreationRequest } from '../../types/Requests';

@Injectable()
export class RolesService {
  constructor(private prisma: UtilsService) {}

  async create(role: RolesCreationRequest): Promise<string> {
    try {
      const roleResultTransaction = await this.prisma.roles.create({
        data: {
          name: role.name,
          description: role.description,
        },
      });
      const listModules = await this.prisma.modules.findMany({
        where: {
          id: {
            in: role.modules,
          },
        },
      });
      let permissions = [];
      role.modules.map((permission: number) => {
        permissions.push({
          moduleId: listModules.find((module) => module.id === permission).id,
          roleId: roleResultTransaction.id,
        });
      });
      await this.prisma.permissions.createMany({
        data: permissions,
      });
      return 'Rol creado correctamente';
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2002') {
        throw new Error(
          JSON.stringify({
            code: error.code,
            message: 'El nombre del rol ya existe',
          }),
        );
      } else {
        throw new Error(
          JSON.stringify({ code: error.code, message: error.message }),
        );
      }
    }
  }

  async listRoles(): Promise<any[]> {
    try {
      const list = await this.prisma.roles.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          Permissions: {
            select: {
              id: true,
              module: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          status: true,
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

  async getById(roleId: number): Promise<any> {
    try {
      const roleFind = await this.prisma.roles.findUnique({
        where: {
          id: roleId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          Permissions: {
            select: {
              id: true,
              module: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          status: true,
        },
      });
      return roleFind;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async update(roleId: number, role: RolesCreationRequest): Promise<string> {
    try {
      await this.prisma.roles.update({
        where: {
          id: roleId,
        },
        data: {
          name: role.name,
          description: role.description,
          updatedAt: new Date(),
        },
      });
      await this.prisma.permissions.deleteMany({
        where: {
          roleId,
        },
      });
      const newPermissions = role.modules.map((moduleId) => ({
        roleId,
        moduleId,
      }));
      await this.prisma.permissions.createMany({
        data: newPermissions,
      });
      return 'Rol actualizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async delete(roleId: number): Promise<string> {
    try {
      const usersMatch = await this.prisma.user.findMany({
        where: {
          roleId,
        },
      });
      if (usersMatch.length > 0) {
        throw new Error(
          JSON.stringify({
            code: 'P2003',
            message: 'Hay usuarios asignados a este rol, no se puede borrar',
          }),
        );
      } else {
        await this.prisma.permissions.deleteMany({
          where: {
            roleId,
          },
        });
        await this.prisma.roles.delete({
          where: {
            id: roleId,
          },
        });
      }
      return 'Rol eliminado correctamente';
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2003') {
        throw new Error(
          JSON.stringify({
            code: error.code,
            message: 'Hay usuarios asignados a este rol, no se puede borrar',
          }),
        );
      }
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(RolesService.name);
}
