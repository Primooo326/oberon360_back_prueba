import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProtocolDto {
    @IsNotEmpty()
    @IsString()
    FUN_CARGOID: string;

    @IsNotEmpty()
    @IsString()
    FUN_TIPOFUNID: string;
    
    @IsNotEmpty()
    @IsString()
    FUN_PREG_ID: string;
    
    @IsOptional()
    @IsString()
    FUN_FUNCION: string;
    
    @IsOptional()
    @IsString()
    FUN_STATUS: string;
}