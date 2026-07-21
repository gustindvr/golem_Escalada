import ExcelJS from "exceljs";

export async function buildExcelBuffer(rows: Array<Record<string, unknown>>) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Pagos");

  if (rows.length > 0) {
    const headers = Object.keys(rows[0]);
    worksheet.addRow(headers);

    rows.forEach((row) => {
      worksheet.addRow(headers.map((header) => row[header] ?? ""));
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
