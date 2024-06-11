import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProtocolDto {
    @IsOptional()
    @IsString()
    FUN_CARGOID?: string | null;

    @IsNotEmpty()
    @IsString()
    FUN_TIPOFUNID: string;
    
    @IsNotEmpty()
    @IsString()
    FUN_PREG_ID: string;
    
    @IsNotEmpty()
    @IsString()
    FUN_FUNCION: string;
}