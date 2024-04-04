import { IsNotEmpty, IsString } from 'class-validator';

export class EmotionsEasyRecognitionDto {
    @IsNotEmpty()
    @IsString()
    image64base: string;
}