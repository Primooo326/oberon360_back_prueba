import { IsNotEmpty, IsString } from "class-validator";

export class CreateZProtocolosDto {
    @IsNotEmpty()
    @IsString()
    PRODVEX_NAME: string;

    @IsNotEmpty()
    @IsString()
    PRODVEX_FECHA: string;

    @IsNotEmpty()
    @IsString()
    PRODVEX_ESTADO_PROTOCOLO: string;

    @IsNotEmpty()
    @IsString()
    PRODVEX_BITACORA: string;
}