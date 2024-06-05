import { Injectable } from '@nestjs/common';
import { DownloadExcelDto } from '../../dtos-globals/download.excel.dto';
import { Workbook } from 'exceljs';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
  async downloadExcel(dto: DownloadExcelDto): Promise<any> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const headers = Object.keys(dto.dataExport[0]);
    const headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '3B82F6' }
        };
        cell.font = {
            color: { argb: 'FFFFFFFF' },
            bold: true
        };
    });

    dto.dataExport.forEach((element: any) => {
        const row = [];
        headers.forEach((header) => {
            row.push(element[header]);
        });
        worksheet.addRow(row);
    });

    worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            const cellValue = cell.value ? cell.value.toString() : '';
            if (cellValue.length > maxLength) {
                maxLength = cellValue.length;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const timestamp = new Date().getTime();
    const directory = 'exports';
    const filePath = `${directory}/excel_${timestamp}.xlsx`;

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    await workbook.xlsx.writeFile(filePath);

    return filePath;
  }
}