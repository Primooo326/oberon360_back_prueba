import { HttpException, Injectable } from '@nestjs/common';
import { ValidateEasyRecognitionDto } from './dto/validate-easy-recognition.dto';
import { CompareFacesCommand, DetectFacesCommand, QualityFilter, RekognitionClient } from '@aws-sdk/client-rekognition';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IcpEmployee } from './entities/icp-employee.entity';
import { EmotionsEasyRecognitionDto } from './dto/emotions-easy-recognition.dto';
import { UserLoginDto } from 'apps/oberon360-api/src/dtos-globals/user-login.dto';
import { OcUser } from 'apps/oberon360-api/src/modules/user/entities/oc-user.entity';

@Injectable()
export class EasyRecognitionService {
  constructor(
    @InjectRepository(IcpEmployee, 'ICP') private repositoryIcpEmployee: Repository<IcpEmployee>,
    @InjectRepository(OcUser, 'OC') private repositoryOcUser: Repository<OcUser>,
  ) { }

  async validateAuthentication(validateEasyRecognitionDto: ValidateEasyRecognitionDto, user: UserLoginDto): Promise<any> 
  {
    const config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
    };

    const EMPL_IDEMPLEADO = await this.repositoryOcUser.findOneBy({SUSU_ID_REG: user.userId});

    if (!EMPL_IDEMPLEADO) throw new HttpException('El usuario no se encontró en la base de datos', 403);

    const { SUSU_IDENTIFICACION } = EMPL_IDEMPLEADO;
    const { image64base } = validateEasyRecognitionDto;

    const employee = await this.repositoryIcpEmployee.createQueryBuilder('employee')
      .where({EMPL_IDEMPLEADO: SUSU_IDENTIFICACION})
      .getOne();

    if (!employee) throw new HttpException('El empleado no se encontró en la base de datos', 403);

    const imageFromDB = Buffer.from(employee.EMPL_FOTO, 'base64');
    const targetImageBytes = Buffer.from(image64base, 'base64');

    const input = {
      SourceImage: { Bytes: imageFromDB },
      TargetImage: { Bytes: targetImageBytes },
      SimilarityThreshold: 70,
      QualityFilter: QualityFilter.AUTO
    };

    const client = new RekognitionClient(config);

    const command = new CompareFacesCommand(input);
    const response = await client.send(command);

    if (response.FaceMatches.length == 0) throw new HttpException('No coinciden los rostros', 403);

    return {
      statusCode: 200,
      message: "Autenticación existosa"
    };
  }
  
  async  emotionsEasyRecognition(emotionsEasyRecognitionDto: EmotionsEasyRecognitionDto): Promise<any> 
  {
    const config = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
    };

    const { image64base } = emotionsEasyRecognitionDto;
    const targetImageBytes = Buffer.from(image64base, 'base64');

    const input: any = {
      Image: { 
          Bytes: targetImageBytes
      },
      Attributes: [
        "AGE_RANGE",
        "BEARD",
        "EMOTIONS",
        "EYE_DIRECTION",
        "EYEGLASSES",
        "EYES_OPEN",
        "GENDER",
        "MOUTH_OPEN",
        "MUSTACHE",
        "FACE_OCCLUDED",
        "SMILE",
        "SUNGLASSES"
      ],
    };

    const client = new RekognitionClient(config);
    const command = new DetectFacesCommand(input);
    const response = await client.send(command);

    return response;
  }
}