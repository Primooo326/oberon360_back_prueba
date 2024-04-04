import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidateEasyRecognitionDto {
    @IsNotEmpty()
    @IsNumber()
    EMPL_IDEPLEADO: number;

    @IsNotEmpty()
    @IsString()
    image64base: string;
}
