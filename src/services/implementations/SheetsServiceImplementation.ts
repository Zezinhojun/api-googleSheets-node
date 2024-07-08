import { SheetData } from '../../entities/googleSheets';
import SheetRepositoryImplementation from '../../repositories/implementations/SheetsRepositoryImplementation';
import IGoogleSheetService from '../googlesheets.service';

export default class SheetsServiceImplementation
  implements IGoogleSheetService
{
  constructor(private googleSheetsRepository: SheetRepositoryImplementation) {}

  public async getMetadata(): Promise<any> {
    try {
      const metadata = await this.googleSheetsRepository.getMetadata();

      return metadata;
    } catch (error: any) {
      throw new Error(`Error fetching metadata: ${error.message}`);
    }
  }

  public async updateRow(
    lineId: number,
    updateData: SheetData,
  ): Promise<SheetData> {
    try {
      const rowUpdated = await this.googleSheetsRepository.updateValue(
        lineId,
        updateData,
      );

      return rowUpdated;
    } catch (error: any) {
      throw new Error(`Error updating rows data: ${error.message}`);
    }
  }

  public async getAllData(pageNumber: number, pageSize: number): Promise<any> {
    try {
      const rows = await this.googleSheetsRepository.getRows(
        pageNumber,
        pageSize,
      );

      return rows;
    } catch (error: any) {
      throw new Error(`Error fetching rows data: ${error.message}`);
    }
  }

  public async deleteRow(lineId: number): Promise<void> {
    try {
      return await this.googleSheetsRepository.deleteRow(lineId);
    } catch (error: any) {
      throw new Error(`Error deleting row: ${error.message}`);
    }
  }
  public async findRow(lineId: number): Promise<SheetData> {
    try {
      const row = await this.googleSheetsRepository.getRow(lineId);

      return row;
    } catch (error: any) {
      throw new Error(`Error fetching row data: ${error.message}`);
    }
  }
  public async getPatologies(): Promise<SheetData> {
    try {
      const range = "'Página1'!C2:C";
      const patologies = await this.googleSheetsRepository.getColumn(range);

      return patologies;
    } catch (error: any) {
      throw new Error(`Error fetching treatment data: ${error.message}`);
    }
  }

  public async getTreatments(): Promise<SheetData> {
    try {
      const range = "'Página1'!A2:A";
      const treatments = await this.googleSheetsRepository.getColumn(range);

      return treatments;
    } catch (error: any) {
      throw new Error(`Error fetching treatment data: ${error.message}`);
    }
  }

  public async createRow(sheetData: SheetData): Promise<void> {
    try {
      await this.googleSheetsRepository.createRow(sheetData);
    } catch (error: any) {
      throw new Error(`Failed to create row: ${error.message}`);
    }
  }
}
