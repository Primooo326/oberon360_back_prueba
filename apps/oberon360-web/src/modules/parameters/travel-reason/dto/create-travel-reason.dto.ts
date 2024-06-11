import { IsNotEmpty, IsString } from "class-validator";

export class CreateTravelReasonDto {
    @IsNotEmpty()
    @IsString()
    VIATIMOT_DESCRIPCION: string;

    @IsNotEmpty()
    @IsString()
    VIATIMOT_REQUIEREFOTO: string;
}