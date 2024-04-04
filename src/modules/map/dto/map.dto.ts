import { IsOptional } from "class-validator";

export class MapDto {
    @IsOptional()
    CLIUBIC_ID_CLIENT: number | null;
}
