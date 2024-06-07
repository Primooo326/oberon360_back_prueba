import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryNoveltyDto {
    @IsOptional()
    @IsString()
    TIPRUTA_CLIENTEID: string;

    @IsNotEmpty()
    @IsString()
    TIPRUTA_DESCRIPCION: string;

    @IsOptional()
    @IsString()
    TIPRUTA_STATUS: string;
}