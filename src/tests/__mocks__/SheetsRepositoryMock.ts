import { SheetData } from '../../entities/googleSheets';
import SheetAuthProvider from '../../providers/implementations/SheetsAuthProvider';
import IGoogleSheetsRepository from '../../repositories/GoogleSheetsRepository';

// Mock do SheetRepositoryImplementation
export default class SheetRepositoryMock implements IGoogleSheetsRepository {
  private data: { [key: string]: any };

  constructor(readonly sheetsAuthProvider: SheetAuthProvider) {
    this.data = {
      'Página1!A1:Z1': { values: [['Mocked data']] }, // Exemplo de dados para um range específico
    };

    // Configurar espionagem nos métodos do provider
    jest
      .spyOn(this.sheetsAuthProvider, 'getAuth')
      .mockResolvedValue(this.sheetsAuthProvider.getAuth());
    jest
      .spyOn(this.sheetsAuthProvider, 'initAuth')
      .mockResolvedValue(undefined);
  }
  async updateValue(lineId: number, values: any): Promise<SheetData> {
    const range = `Página1!A${lineId}:Z${lineId}`;
    this.data[range] = { values: [Object.values(values)] }; // Simula a atualização no mock
    return this.data[range];
  }

  async deleteRow(lineId: number): Promise<any> {
    const range = `Página1!A${lineId}:Z${lineId}`;
    delete this.data[range]; // Simula a exclusão no mock
  }

  async getRow(lineId: number): Promise<SheetData> {
    const range = `Página1!A${lineId}:Z${lineId}`;
    const rowData = this.data[range];
    if (!rowData) {
      throw new Error('Row not found in mock data');
    }
    return rowData;
  }

  async createRow(values: any): Promise<any> {
    const range = 'Página1';
    this.data[range] = { values: [Object.values(values)] }; // Simula a criação de uma nova linha no mock
  }

  async getColumn(range: string): Promise<SheetData> {
    const columnData = this.data[range];
    if (!columnData) {
      throw new Error('Column not found in mock data');
    }
    return columnData;
  }

  async getRows(pageNumber: number, pageSize: number): Promise<SheetData> {
    const startRow = (pageNumber - 1) * pageSize + 2;
    const endRow = startRow + pageSize - 1;
    const range = `'Página1'!A${startRow}:Z${endRow}`;
    const rowsData = this.data[range];
    if (!rowsData) {
      throw new Error('Rows not found in mock data');
    }
    return rowsData;
  }

  async getMetadata(): Promise<any> {
    // Simula a obtenção de metadados no mock
    return { sheets: [{ properties: { title: 'Página1' } }] };
  }
}
