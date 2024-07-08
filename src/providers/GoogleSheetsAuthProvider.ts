import { GoogleAuth } from 'google-auth-library';
import { sheets_v4 } from 'googleapis';

export default interface IGoogleSheetsAuth {
  getAuth(): Promise<{
    auth: GoogleAuth;
    client: any;
    googleSheets: sheets_v4.Sheets;
    spreadsheetId: string;
  }>;
}
