import { IsArray, IsNotEmpty } from "class-validator";

export class DownloadExcelDto {
    @IsNotEmpty()
    @IsArray()
    dataExport: ElementData[];
}

export class ElementData {
    CONDUCTOR_ID: string;
    CONDUCTOR_IDENTIFICACION: string;
    CONDUCTOR_CODCONDUCTOR: string;
    CONDUCTOR_PRIMERNOMBRE: string;
    CONDUCTOR_SEGUNDONOMBRE: string;
    CONDUCTOR_PRIMERAPELLIDO: string;
    CONDUCTOR_SEGUNDOAPELLIDO: string;
    CONDUCTOR_TELPERSONAL: string;
    CONDUCTOR_TELCORPORATIVO: string;
    CONDUCTOR_CORREO: string;
    CONDUCTOR_ESTADO: string;
    CONDUCTOR_FECINGRESO: string;
    typeIdentification: {
        TIP_IDEN_DESCRIPCION: string;
    };
    factorRh: {
        FACTOR_RH_DESCRIPCION: string;
    };
}