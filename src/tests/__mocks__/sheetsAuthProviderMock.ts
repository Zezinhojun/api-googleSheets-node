import { OAuth2Client } from 'google-auth-library';
import { GoogleAuth } from 'google-auth-library';
import { sheets_v4 } from 'googleapis';
import IGoogleSheetsAuth from '../../providers/GoogleSheetsAuthProvider';

export default class SheetAuthProviderMock implements IGoogleSheetsAuth {
  auth: GoogleAuth;
  googleSheets: sheets_v4.Sheets;
  readonly spreadsheetId: string;

  constructor() {
    this.spreadsheetId = 'mockedSpreadsheetId';
    this.auth = {} as GoogleAuth; // Mock vazio para evitar autenticação real
    this.googleSheets = {} as sheets_v4.Sheets; // Mock vazio para evitar autenticação real
  }

  async initAuth() {
    // Simular inicialização de autenticação
    this.auth = {} as GoogleAuth;
    this.googleSheets = {} as sheets_v4.Sheets;
  }

  async getAuth(): Promise<{
    auth: GoogleAuth;
    client: any;
    googleSheets: sheets_v4.Sheets;
    spreadsheetId: string;
  }> {
    // Return a mock auth object or simply bypass the authentication
    return {
      auth: {} as GoogleAuth,
      client: {} as OAuth2Client,
      googleSheets: {} as sheets_v4.Sheets,
      spreadsheetId: 'mockSpreadsheetId',
    };
  }
}
