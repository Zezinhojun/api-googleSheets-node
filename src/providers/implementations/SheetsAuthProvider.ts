import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';
import IGoogleSheetsAuth from '../GoogleSheetsAuthProvider';
import path from 'path';

const serviceAccountPath = path.resolve(
  __dirname,
  './../../../credentials.json',
);

export default class SheetAuthProvider implements IGoogleSheetsAuth {
  auth: GoogleAuth;
  googleSheets!: sheets_v4.Sheets;
  readonly spreadsheetId: string;

  constructor() {
    this.spreadsheetId = process.env.SPREADSHEET_ID ?? '';
    this.auth = new GoogleAuth({
      keyFile: serviceAccountPath,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
  }

  async initAuth() {
    const client = await this.auth.getClient();
    if (!(client instanceof OAuth2Client)) {
      throw new Error('Client is not an OAuth2Client.');
    }
    this.googleSheets = google.sheets({ version: 'v4', auth: client });
  }

  async getAuth(): Promise<{
    auth: GoogleAuth;
    client: any;
    googleSheets: sheets_v4.Sheets;
    spreadsheetId: string;
  }> {
    if (!this.googleSheets) {
      await this.initAuth();
    }
    return {
      auth: this.auth,
      client: this.auth,
      googleSheets: this.googleSheets,
      spreadsheetId: this.spreadsheetId,
    };
  }
}
