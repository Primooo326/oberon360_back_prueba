import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTravelReasonDto {
    @IsNotEmpty()
    @IsString()
    VIATIMOT_DESCRIPCION: string;

    @IsNotEmpty()
    @IsString()
    VIATIMOT_REQUIEREFOTO: string;

    @IsNotEmpty()
    @IsString()
    VIATIMOT_STATUS: string;
}
