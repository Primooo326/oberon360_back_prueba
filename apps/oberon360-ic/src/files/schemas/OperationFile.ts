import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OperationFileDocument = OperationFile & Document;

@Schema({ versionKey: false, collection: 'operation_files' })
export class OperationFile {
  @Prop({ required: true })
  studyId!: number;

  @Prop({ required: true })
  fileModule!: string;

  @Prop({ required: true })
  indexFile!: number;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  name!: string;

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

export const OperationFileSchema = SchemaFactory.createForClass(OperationFile);
