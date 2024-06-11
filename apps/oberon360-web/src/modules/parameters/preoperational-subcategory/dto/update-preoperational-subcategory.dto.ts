import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePreoperationalSubcategoryDto {
    @IsNotEmpty()
    @IsString()
    SUBCATPREOP_DESCRIPCION: string;
    
    @IsNotEmpty()
    @IsNumber()
    SUBCATPREOP_IDCATEGORIA: number;
}