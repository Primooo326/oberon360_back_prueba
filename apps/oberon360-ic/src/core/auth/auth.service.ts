import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from '../../utils/utils.service';
import { Scopes } from '../../types/Scopes';
import IResponse from '../../types/IResponse';

@Injectable()
export class AuthService {
  constructor(private prisma: UtilsService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        password: true,
        customerId: true,
        role: {
          include: {
            Permissions: {
              include: {
                module: true,
              },
            },
          },
        },
        status: true,
        signFilePath: true,
        isSystemUser: true,
      },
    });
    if (!user) {
      const candidate = await this.prisma.candidate.findFirst({
        where: {
          username,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          password: true,
          customerId: true,
          status: true,
        },
      });
      if (candidate && (await bcrypt.compare(pass, candidate.password))) {
        const payload = { ...candidate, scope: Scopes.CANDIDATE };
        delete payload.password;
        await this.prisma.candidate.update({
          where: {
            id: candidate.id,
          },
          data: {
            lastLogin: new Date().toISOString(),
          },
        });
        return payload;
      }
    } else {
      if (await bcrypt.compare(pass, user.password)) {
        const payload = { ...user, scope: Scopes.OPERATION };
        delete payload.password;
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date().toISOString(),
          },
        });
        return payload;
      }
    }
    return null;
  }

  async login(user: any): Promise<IResponse> {
    const payload: any = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      customerId: user.customerId,
      scope: user.scope,
      isSystemUser: user.isSystemUser,
    };
    user.role && (payload.role = user.role.name);
    if (user.scope === Scopes.OPERATION) {
      payload.permissions = user.role.Permissions.map((permission: any) => {
        return {
          moduleId: permission.moduleId,
          module: permission.module.name,
        };
      });
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      });
    } else {
      await this.prisma.candidate.update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      });
    }
    return {
      status: 'success',
      data: {
        token: this.jwtService.sign(payload),
        scope: payload.scope,
      },
    };
  }
}
