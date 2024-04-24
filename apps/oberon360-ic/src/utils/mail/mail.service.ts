import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import IMailOptions from '../../types/MailOptions';

@Injectable()
export class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(mailOptions: IMailOptions): Promise<any> {
    try {
      this.transporter.sendMail(mailOptions, (error: any, response) => {
        if (error) {
          this.logger.error(
            'Error when try send email: ',
            JSON.stringify(error),
          );
          throw new Error(error);
        }
        return response;
      });
    } catch (error) {
      this.logger.error(
        'Error in email service transaction: ',
        JSON.stringify(error),
      );
      throw new Error(error);
    }
  }

  transporter: nodemailer.Transporter;

  private readonly logger = new Logger(MailService.name);
}
