import { IsArray, IsNotEmpty } from "class-validator";

export class DownloadExcelDto {
    @IsNotEmpty()
    @IsArray()
    dataExport: ElementDriver[] | ElementProtocol[];
}

export class ElementDriver {
    "ID": string;
    "Tipo de Documento": string;
    "Documento": string;
    "Código": string;
    "Nombre Completo": string;
    "Teléfono Personal": string;
    "Teléfono Corporativo": string;
    "Correo Electrónico": string;
    "RH": string;
}

export class ElementActivity {
    "Código": string;
    "Actividad": string;
}

export class ElementProtocolResponsible {
    "Código": string;
    "Responsable Protocolo": string;
}

export class ElementProtocol {
    "Responsable Protocolo": string;
    "Actividad": string;
    "Protocolo": string;
}