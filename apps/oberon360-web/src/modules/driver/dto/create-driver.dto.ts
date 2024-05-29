import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDriverDto {
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_ID_TIPOIDENTIFICACION: string;

    @IsNotEmpty()
    @IsString()
    CONDUCTOR_IDENTIFICACION: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_CODCONDUCTOR: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_PRIMERNOMBRE: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_SEGUNDONOMBRE: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_PRIMERAPELLIDO: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_SEGUNDOAPELLIDO: string;
    
    @IsNotEmpty()
    @IsNumber()
    CONDUCTOR_ID_RH: number;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_TELPERSONAL: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_TELCORPORATIVO: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_CORREO: string;
    
    @IsNotEmpty()
    @IsNumber()
    CONDUCTOR_ID_CIUDAD: number;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_PASSWORD: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_FOTO: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_FECINGRESO: string;
    
    @IsNotEmpty()
    @IsString()
    CONDUCTOR_ESTADO: string;
}