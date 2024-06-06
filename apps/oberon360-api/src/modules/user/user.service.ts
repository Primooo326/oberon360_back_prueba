import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OcUser } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePassDto } from './dto/change-pass.dto';
import { UserLoginDto } from '../../dtos-globals/user-login.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(OcUser, 'OC') private repositoryOcUser: Repository<OcUser>,
    private authService: AuthService
  ) { }

  
  public async changePassword(changePassDto: ChangePassDto, user: UserLoginDto): Promise<any> 
  {
    const { newPassword, confirmPassword } = changePassDto;
    if(newPassword !== confirmPassword) throw new HttpException('Las constraseñas no coinciden', 403);
    
    const { userId } = user;

    const infoUser = await this.repositoryOcUser.findOneBy({SUSU_ID_REG: userId});

    const passwordEncrypt = this.authService.encryptPassword(newPassword);

    if (infoUser.SUSU_PWD == passwordEncrypt) throw new HttpException('La contraseña no puede ser la misma que la anterior', 403);

    await this.repositoryOcUser.update({ SUSU_ID_REG: userId }, {
      SUSU_PWD: passwordEncrypt,
      SUSU_UPDATE_PASS: new Date()
    });

    return {
      statusCode: 200,
      message: 'La contraseña se ha actualizado correctamente. Por favor, inicie sesión nuevamente'
    }
  }
}