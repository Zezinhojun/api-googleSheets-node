import { SheetData } from '../entities/googleSheets';

export default interface IGoogleSheetsRepository {
  getRows(pageNumber: number, pageSize: number): Promise<SheetData>;
  getColumn(range: string): Promise<SheetData>;
  getRow(lineId: number): Promise<SheetData>;
  createRow(sheetData: SheetData): Promise<SheetData>;
  deleteRow(lineId: number): Promise<void>;
  updateValue(lineId: number, values: SheetData): Promise<SheetData>;
  getMetadata(): Promise<any>;
}
