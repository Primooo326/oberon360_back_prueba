import { IsOptional, IsString } from "class-validator";

export class FilterOptionsDto {
    @IsOptional()
    @IsString()
    dateInit: string;

    @IsOptional()
    @IsString()
    dateEnd: string;
}