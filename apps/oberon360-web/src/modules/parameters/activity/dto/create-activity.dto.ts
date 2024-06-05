import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActivityDto {
    @Transform(({ value }) => value ? value.toUpperCase() : value)
    @IsNotEmpty()
    @IsString()
    PREFUN_ID: string;

    @IsNotEmpty()
    @IsString()
    PREFUN_PREGUNTA: string;
}