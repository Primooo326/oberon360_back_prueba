import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateEasyRecognitionDto {
    @IsNotEmpty()
    EMPL_IDEMPLEADO: number | string;

    @IsNotEmpty()
    @IsString()
    image64base: string;
}
