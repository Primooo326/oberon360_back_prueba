import * as bcrypt from 'bcryptjs';
import { Inject, Injectable, Scope, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Types } from 'mongoose';
import { UtilsService } from '../../utils/utils.service';
import { User } from '@prisma/client';
import { UsersCreationRequest } from '../../types/Requests';
import { FilesService } from '../../files/files.service';
import { FileTypes } from '../../types/FileTypes';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    private prisma: UtilsService,
    @Inject(REQUEST) private readonly request: any,
    private readonly fileService: FilesService,
  ) {}

  async create(user: UsersCreationRequest, file: any): Promise<string> {
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          username: user.username,
          name: user.name,
          chargeId: Number(user.chargeId),
          customerId: Number(user.customerId),
          roleId: Number(user.roleId),
          email: user.email,
          password: await this.hashPassword(process.env.DEFAULT_PASSWORD),
          status: Boolean(user.status),
        },
      });
      const signFile = {
        name: file.originalname,
        response: file.buffer,
        encoding: file.encoding,
        size: Number(file.size),
        type: file.mimetype,
        module: 'users',
        fileType: FileTypes.USER_SIGN_FILE,
        userEntityId: this.request.user.id,
      };
      const fileResponse = await this.fileService.loadFile(
        signFile,
        userCreated.id,
      );
      await this.prisma.user.update({
        data: {
          signFilePath: fileResponse._id,
        },
        where: {
          id: userCreated.id,
        },
      });
      return 'Usuario creado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async loadMany(users: User[]): Promise<string> {
    try {
      users.map(
        async (user: User) =>
          (user.password = await this.hashPassword(
            process.env.DEFAULT_PASSWORD,
          )),
      );
      await this.prisma.user.createMany({
        data: users,
      });
      return 'Usuarios cargados correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async listUsers(): Promise<any[]> {
    try {
      const list = (await this.prisma.user.findMany({
        where: {
          isSystemUser: false,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          roleId: true,
          role: {
            select: {
              name: true,
            },
          },
          chargeId: true,
          charge: {
            select: {
              value: true,
            },
          },
          customerId: true,
          lastLogin: true,
          signFilePath: true,
          status: true,
          isSystemUser: true,
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
      const userFinded = await this.prisma.user.findUnique({
        where: {
          id: this.request.user.id,
        },
      });
      if (
        await this.compareHashPassword(currentPassword, userFinded.password)
      ) {
        const newPassword = await this.hashPassword(password);
        await this.prisma.user.update({
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

  async updateUser(userId: number, user: User): Promise<string> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: user,
      });
      return 'Usuario actualizado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async deleteUser(userId: number): Promise<string> {
    try {
      const userSearching = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      userSearching.signFilePath &&
        this.fileService.deleteFile(
          new Types.ObjectId(userSearching.signFilePath),
        );
      await this.prisma.user.delete({
        where: {
          id: userId,
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

  private hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  };

  private compareHashPassword = async (password: string, text: string) => {
    return await bcrypt.compare(password, text);
  };

  private readonly logger = new Logger(UsersService.name);
}
