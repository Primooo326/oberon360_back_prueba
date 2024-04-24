import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Scopes } from '../../types/Scopes';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: any) {
    let userData: any = {};
    userData = {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      scope: payload.scope,
      isSystemUser: payload.isSystemUser,
      customerId: payload.customerId,
    };
    if (payload.scope === Scopes.OPERATION) {
      userData.permissions = payload.permissions && payload.permissions;
    }
    return userData;
  }
}
