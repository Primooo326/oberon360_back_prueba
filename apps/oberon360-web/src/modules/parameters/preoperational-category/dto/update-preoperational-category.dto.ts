import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePreoperationalCategoryDto {
    @IsNotEmpty()
    @IsString()
    CATPREOP_DESCRIPCION: string;
    
    @IsNotEmpty()
    @IsNumber()
    CATPREOP_ORDEN: number;
}