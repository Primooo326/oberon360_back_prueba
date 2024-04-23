import { IsOptional } from "class-validator";

export class EventsMotorcycleDto {
    @IsOptional()
    EMPLEADOID: string;

    @IsOptional()
    FECHA: string;

    @IsOptional()
    COMPLETO_EMPLEADO: string;
}