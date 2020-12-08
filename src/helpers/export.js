import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import {
    exportDataGrid
} from 'devextreme/excel_exporter';

export default {
    onExporting(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('All Products');
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            topLeftCell: {
                row: 4,
                column: 1
            }
        }).then((cellRange) => {
            const headerRow = worksheet.getRow(2);
            headerRow.height = 30;
            worksheet.mergeCells(2, 1, 2, 8);
            headerRow.getCell(1).value = 'All Products';
            headerRow.getCell(1).font = {
                name: 'Segoe UI Light',
                size: 22
            };
            headerRow.getCell(1).alignment = {
                horizontal: 'center'
            };

            const footerRowIndex = cellRange.to.row + 2;
            const footerRow = worksheet.getRow(footerRowIndex);
            worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

            footerRow.getCell(1).value = 'www.wikipedia.org';
            footerRow.getCell(1).font = {
                color: {
                    argb: 'BFBFBF'
                },
                italic: true
            };
            footerRow.getCell(1).alignment = {
                horizontal: 'right'
            };
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
                saveAs(new Blob([buffer], {
                    type: 'application/octet-stream'
                }), 'AllProducts_powrpac.xlsx');
            });
        });
        e.cancel = true;
    }
}