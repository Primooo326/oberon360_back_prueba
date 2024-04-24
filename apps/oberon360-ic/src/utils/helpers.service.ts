import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  };

  compareHashPassword = async (password: string, text: string) => {
    return await bcrypt.compare(password, text);
  };
}
