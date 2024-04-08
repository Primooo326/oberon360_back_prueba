import { IsNotEmpty, IsString } from "class-validator";

export class ChangePassDto {
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}