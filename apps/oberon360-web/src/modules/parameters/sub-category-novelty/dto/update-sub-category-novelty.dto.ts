import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateSubCategoryNoveltyDto {
    @IsNotEmpty()
    @IsNumber()
    NOVRUTA_IDTIPO: number;

    @IsNotEmpty()
    @IsString()
    NOVRUTA_DESCRIPCION: string;
}