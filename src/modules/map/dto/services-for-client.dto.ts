import { IsNotEmpty } from "class-validator";

export class ServicesForClientDto {
    @IsNotEmpty()
    CLIE_ID_REG: string | number;
}
