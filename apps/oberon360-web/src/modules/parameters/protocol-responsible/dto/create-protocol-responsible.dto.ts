import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProtocolResponsibleDto {
    @Transform(({ value }) => value ? value.toUpperCase() : value)
    @IsNotEmpty()
    @IsString()
    TFUN_ID: string;

    @IsNotEmpty()
    @IsString()
    TFUN_NOMBRE: string;
    
    @IsNotEmpty()
    @IsString()
    TFUN_ORDEN: string;
    
    @IsNotEmpty()
    @IsString()
    TFUN_STATUS: string;
}