import { SheetData } from '../entities/googleSheets';

export default interface IGoogleSheetService {
  createRow(sheetData: SheetData): Promise<void>;
  getTreatments(): Promise<SheetData>;
  getPatologies(): Promise<SheetData>;
  findRow(lineId: number): Promise<SheetData>;
  deleteRow(lineId: number): Promise<void>;
  getAllData(pageNumber: number, pageSize: number): Promise<any>;
  updateRow(lineId: number, updateData: SheetData): Promise<SheetData>;
  getMetadata(): Promise<any>;
}
