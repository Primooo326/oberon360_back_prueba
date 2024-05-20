import { IsBoolean, IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreatePointsMapsDto {
    @IsNotEmpty()
    @IsString()
    CLIPMARK_LABEL: string;

    @IsNotEmpty()
    @IsString()
    CLIPMARK_DESCRIPTION: string;

    @IsNotEmpty()
    @IsNumber()
    CLIPMARK_MISION_ID: number;

    @IsNotEmpty()
    @IsString()
    MISSION_IDENTIFIER: string;

    @IsNotEmpty()
    @IsNumber()
    CLIPMARK_CHANNEL_ID: number;

    @IsNotEmpty()
    @IsString()
    CHANNEL_NAME: string;

    @IsNotEmpty()
    @IsString()
    CLIPMARK_FOLDER_PATH: string;

    @IsNotEmpty()
    @IsString()
    CLIPMARK_PREVIEW_PATH: string;

    @IsOptional()
    // @IsString()
    CLIPMARK_EVENT_LOCATION: any;

    @IsNotEmpty()
    @IsBoolean()
    CLIPMARK_EVENT_START_TIME: boolean;

    @IsNotEmpty()
    @IsBoolean()
    CLIPMARK_EVENT_END_TIME: boolean;

    @IsNotEmpty()
    @IsString()
    CLIPMARK_AUTHOR: string;
}