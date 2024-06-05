import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProtocolResponsibleDto {
    @IsNotEmpty()
    @IsString()
    TFUN_NOMBRE: string;
    
    @IsNotEmpty()
    @IsString()
    TFUN_ORDEN: string;
}