import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ versionKey: false, collection: 'app_files' })
export class File {
  @Prop({ required: true })
  module!: string;

  @Prop({ required: true })
  fileType!: string;

  @Prop({ required: true })
  userEntityId!: number;

  @Prop({ required: true })
  mimeType!: string;

  @Prop()
  fileIndex!: string;

  @Prop({ required: true })
  fileName!: string;

  @Prop({ required: true })
  size!: number;

  @Prop({ required: true })
  encoding!: string;

  @Prop({ required: true })
  data!: string;

  @Prop({ default: new Date() })
  uploadAt!: number;

  @Prop({ required: true })
  uploadBy!: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
