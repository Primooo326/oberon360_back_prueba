import { Injectable } from '@nestjs/common';
import { ValidateEasyRecognitionDto } from './dto/validate-easy-recognition.dto';
import { RekognitionClient } from '@aws-sdk/client-rekognition';

@Injectable()
export class EasyRecognitionService {
    async validate(validateEasyRecognitionDto: ValidateEasyRecognitionDto): Promise<any> {
        const config=({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1'
          });
        const { image64base, EMPL_IDEPLEADO } = validateEasyRecognitionDto;
        try {
          const client = new RekognitionClient(config);
    
        //   const pool = await connectToSQLServerINVESCON();
        //   const result = await pool.request().query(`
        //     SELECT TOP 1 [dbo].[F_BinaryToBase64](EMPL_FOTO) AS EMPL_FOTO 
        //     FROM COP018_EMPLEADOS 
        //     WHERE EMPL_IDEMPLEADO ='1013636493'
        //   `);
        //   await pool.close();
    
        //   const imageFromDB = result.recordsets[0][0].EMPL_FOTO;
    
        //   const sourceImageBytes = Buffer.from(imageFromDB, 'base64');
        //   const targetImageBytes = Buffer.from(image64base, 'base64');
    
        //   const input = {
        //     SourceImage: { Bytes: sourceImageBytes },
        //     TargetImage: { Bytes: targetImageBytes },
        //     SimilarityThreshold: 70,
        //     QualityFilter: 'AUTO'
        //   };
    
        //   const command = new CompareFacesCommand(input);
        //   const response = await client.send(command);
    
        //   return response;
        } catch (error) {
          console.error(error);
          throw new Error(error.message);
        }
    }
}
