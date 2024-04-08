import { IsNotEmpty, IsString, Length } from "class-validator";

export class ChangePassDto {
    @IsNotEmpty()
    @IsString()
    @Length(8)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}