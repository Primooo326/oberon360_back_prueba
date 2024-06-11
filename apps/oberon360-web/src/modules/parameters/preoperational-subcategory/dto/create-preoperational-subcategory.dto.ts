import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePreoperationalSubcategoryDto {
    @IsNotEmpty()
    @IsString()
    SUBCATPREOP_DESCRIPCION: string;
    
    @IsNotEmpty()
    @IsNumber()
    SUBCATPREOP_IDCATEGORIA: number;
}