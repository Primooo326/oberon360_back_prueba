import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePointDto {
    @IsOptional()
    @IsString()
    PUN_NOMBRE: string;

    @IsNotEmpty()
    @IsString()
    PUN_TIPO: string;
}