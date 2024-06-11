import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryNoveltyDto {
    @IsOptional()
    @IsString()
    TIPRUTA_CLIENTEID: string;

    @IsNotEmpty()
    @IsString()
    TIPRUTA_DESCRIPCION: string;
}