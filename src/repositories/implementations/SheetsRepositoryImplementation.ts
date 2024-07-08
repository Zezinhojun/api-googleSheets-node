import { SheetData } from '../../entities/googleSheets';
import SheetAuthProvider from '../../providers/implementations/SheetsAuthProvider';
import IGoogleSheetsRepository from '../GoogleSheetsRepository';

export default class SheetRepositoryImplementation
  implements IGoogleSheetsRepository
{
  constructor(readonly sheetsAuthProvider: SheetAuthProvider) {}

  public async updateValue(lineId: number, values: any): Promise<SheetData> {
    try {
      const { googleSheets, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();
      const range = `Página1!A${lineId}:Z${lineId}`;
      const response = await googleSheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: values,
        },
      });

      const updatedRow = response.data;

      return updatedRow as SheetData;
    } catch (error) {
      console.error('Error editing row:', error);
      throw new Error('Internal server error.');
    }
  }

  public async deleteRow(lineId: number): Promise<any> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();
      const range = `Página1!A${lineId}:Z${lineId}`;
      const clearValuesResponse = await googleSheets.spreadsheets.values.clear({
        auth,
        spreadsheetId,
        range: range,
      });

      return clearValuesResponse.data;
    } catch (error) {
      throw new Error('Internal server error.');
    }
  }

  public async getRow(lineId: number): Promise<SheetData> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();
      const range = `Página1!A${lineId}:Z${lineId}`;
      const row = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range,
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
      });

      if (!row.data.values || row.data.values.length === 0) {
        throw new Error('Data not found!');
      }

      return row.data as SheetData;
    } catch (error) {
      throw new Error('Internal server error.');
    }
  }
  public async createRow(values: any): Promise<any> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();

      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Página1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          majorDimension: 'ROWS',
          values: values,
        },
      });

      return 'Row created successfully';
    } catch (error) {
      throw new Error('Internal server error.');
    }
  }

  public async getColumn(range: string): Promise<SheetData> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();
      const response = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range,
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
      });

      const data = response.data as SheetData;
      if (!data?.values) {
        throw new Error('Data not found.');
      }
      return data;
    } catch (error) {
      console.error(`Error fetching data from range ${range}:`, error);
      throw new Error('Internal server error.');
    }
  }

  public async getRows(
    pageNumber: number,
    pageSize: number,
  ): Promise<SheetData> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();

      const pageNumberInt = Math.floor(pageNumber);
      const startRow = (pageNumberInt - 1) * pageSize + 2;
      const endRow = startRow + pageSize - 1;
      const range = `'Página1'!A${startRow}:Z${endRow}`;
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range,
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
      });
      if (!getRows?.data?.values) {
        throw new Error('Data not found!');
      }

      return getRows.data as SheetData;
    } catch (error) {
      console.error('Error fetching rows:', error);
      throw new Error('Internal server error.');
    }
  }

  public async getMetadata(): Promise<any> {
    try {
      const { googleSheets, auth, spreadsheetId } =
        await this.sheetsAuthProvider.getAuth();
      const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
      });

      if (!metadata?.data?.sheets) {
        throw new Error('Metadata not found!');
      }

      return metadata.data;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw new Error('Internal server error.');
    }
  }
}
