import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubCategoryNoveltyDto {
    @IsNotEmpty()
    @IsNumber()
    NOVRUTA_IDTIPO: number;

    @IsNotEmpty()
    @IsString()
    NOVRUTA_DESCRIPCION: string;

    @IsNotEmpty()
    @IsString()
    NOVRUTA_STATUS: string;
}