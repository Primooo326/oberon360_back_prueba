import { IsNumber } from "class-validator";

export class UserLoginDto {
    @IsNumber()
    userId: number;
}