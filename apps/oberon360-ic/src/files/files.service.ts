import * as html_to_pdf from 'html-pdf-node';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { File, FileDocument } from './schemas/File';
import { OperationFile, OperationFileDocument } from './schemas/OperationFile';
import { SignFileOptions, SignOperationalFileOptions } from '../types/Requests';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private fileModel: Model<FileDocument>,
    @InjectModel(OperationFile.name)
    private operationFileModel: Model<OperationFileDocument>,
  ) {}

  async loadFile(
    fileData: SignFileOptions,
    userId: number,
  ): Promise<FileDocument> {
    try {
      const fileToLoad = new this.fileModel({
        mimeType: fileData.type,
        fileName: fileData.name,
        fileIndex: fileData.fileIndex,
        size: fileData.size,
        data: fileData.response.toString('base64'),
        module: fileData.module,
        fileType: fileData.fileType,
        encoding: fileData.encoding,
        userEntityId: fileData.userEntityId,
        uploadAt: Number(new Date()),
        uploadBy: userId,
      });
      return await fileToLoad.save();
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getDataFile(fileId: Types.ObjectId): Promise<FileDocument> {
    try {
      const fileSearching = await this.fileModel.findOne({
        _id: fileId,
      });
      return fileSearching;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async deleteFile(fileID: Types.ObjectId): Promise<string> {
    try {
      await this.fileModel.findByIdAndDelete({
        _id: fileID,
      });
      return 'Archivo eliminado correctamente';
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async createPDFFile(html: string, headerTemplate: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        return html_to_pdf.generatePdf(
          { content: html },
          {
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            preferCSSPageSize: true,
            margin: {
              top: '130px',
              left: '35px',
              right: '35px',
            },
            headerTemplate,
            footerTemplate: `<span>_</span>`,
          },
          (err, buffer) => {
            if (err) {
              this.logger.error(err);
              reject(JSON.stringify(err));
            }
            resolve(buffer);
          },
        );
      } catch (error) {
        this.logger.error(error);
        reject(JSON.stringify({ code: error.code, message: error.message }));
      }
    });
  }

  // Operation
  async loadOperationalFile(
    studyId: number,
    fileData: SignOperationalFileOptions,
    indexFile: number,
    userId: number,
  ): Promise<OperationFileDocument> {
    try {
      const fileToLoad = {
        studyId,
        fileModule: fileData.module,
        indexFile: fileData.indexFile,
        type: fileData.fileType,
        name: fileData.name,
        size: fileData.size,
        encoding: fileData.encoding,
        data: fileData.response.toString('base64'),
        uploadAt: Number(new Date()),
        uploadBy: userId,
      };
      return await this.operationFileModel.findOneAndUpdate(
        { studyId, indexFile, fileModule: fileData.module },
        fileToLoad,
        { upsert: true },
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getOperationDataFileFromModule(
    fileModule: string,
    studyId: number,
  ): Promise<OperationFileDocument[]> {
    try {
      const listFiles = await this.operationFileModel
        .find({
          fileModule,
          studyId,
        })
        .sort({ indexFile: 1 });
      return listFiles;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  async getOperationDataFile(
    fileId: Types.ObjectId,
  ): Promise<OperationFileDocument> {
    try {
      const fileSearching = await this.operationFileModel.findOne({
        _id: fileId,
      });
      return fileSearching;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        JSON.stringify({ code: error.code, message: error.message }),
      );
    }
  }

  private readonly logger = new Logger(FilesService.name);
}
