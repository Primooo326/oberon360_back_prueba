import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ValidateEasyRecognitionDto {
    @IsNotEmpty()
    @IsString()
    image64base: string;
}
