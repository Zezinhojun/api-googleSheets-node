import SheetAuthProvider from '../../../providers/implementations/SheetsAuthProvider';

describe('GoogleSheetsAuthProvider', () => {
  let googleSheetsAuthProvider: SheetAuthProvider;

  beforeAll(() => {
    googleSheetsAuthProvider = new SheetAuthProvider();
  });

  it('should authenticate and get Google Sheets instance', async () => {
    const authData = await googleSheetsAuthProvider.getAuth();
    expect(authData).toHaveProperty('auth');
  });
  it('should handle authentication errors', async () => {
    jest
      .spyOn(googleSheetsAuthProvider['auth'], 'getClient')
      .mockRejectedValueOnce(new Error('fail is not defined'));
    try {
      await googleSheetsAuthProvider.getAuth();
      fail('Expected getAuth() to throw an error');
    } catch (error: any) {
      expect(error instanceof Error).toBeTruthy();
      expect(error.message).toBe('fail is not defined');
    }
  });
});
