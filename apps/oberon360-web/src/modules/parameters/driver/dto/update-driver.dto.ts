import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDriverDto {
    @IsOptional()
    @IsString()
    CONDUCTOR_ID_TIPOIDENTIFICACION: string;

    @IsOptional()
    @IsString()
    CONDUCTOR_IDENTIFICACION: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_CODCONDUCTOR: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_PRIMERNOMBRE: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_SEGUNDONOMBRE: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_PRIMERAPELLIDO: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_SEGUNDOAPELLIDO: string;
    
    @IsOptional()
    @IsNumber()
    CONDUCTOR_ID_RH: number;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_TELPERSONAL: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_TELCORPORATIVO: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_CORREO: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_PASSWORD: string;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_FOTO: any;
    
    @IsOptional()
    @IsString()
    CONDUCTOR_FECINGRESO: string;
}