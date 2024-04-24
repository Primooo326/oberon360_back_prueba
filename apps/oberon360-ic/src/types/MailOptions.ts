export default interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: any;
  attachments?: IMailAttachmentsOptions[];
}

export interface IMailAttachmentsOptions {
  filename: string;
  path?: string;
}
