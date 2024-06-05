import { IsArray, IsNotEmpty } from "class-validator";

export class DownloadExcelDto {
    @IsNotEmpty()
    @IsArray()
    dataExport: any[];
}