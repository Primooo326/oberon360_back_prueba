import { IsNotEmpty } from "class-validator";

export class LineServicesForClientDto {
    @IsNotEmpty()
    CLIE_ID_REG: string | number;
}
