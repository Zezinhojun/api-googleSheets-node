import { SheetData } from '../../../entities/googleSheets';
import SheetsServiceImplementation from '../../../services/implementations/SheetsServiceImplementation';
import SheetAuthProviderMock from '../../__mocks__/sheetsAuthProviderMock';
import SheetRepositoryMock from '../../__mocks__/SheetsRepositoryMock';

describe('GoogleSheetsService', () => {
  let googleSheetsRepository: SheetRepositoryMock;
  let googleSheetsAuthProvider: SheetAuthProviderMock;
  let googleSheetService: SheetsServiceImplementation;

  beforeEach(() => {
    googleSheetsAuthProvider = new SheetAuthProviderMock();
    googleSheetsRepository = new SheetRepositoryMock(googleSheetsAuthProvider);
    googleSheetService = new SheetsServiceImplementation(
      googleSheetsRepository,
    );
    jest.spyOn(googleSheetsRepository, 'getMetadata').mockResolvedValue({
      sheets: [{ properties: { title: 'Página1' } }],
    });
  });

  it('should fetch metadata successfully', async () => {
    jest.spyOn(googleSheetsRepository, 'getMetadata').mockResolvedValue({
      sheets: [{ properties: { title: 'Página1' } }],
    });
    const result = await googleSheetService.getMetadata();
    expect(result).toEqual({
      sheets: [{ properties: { title: 'Página1' } }],
    });
    expect(googleSheetsRepository.getMetadata).toHaveBeenCalled();
  });

  it('should update a row successfully', async () => {
    const mockUpdateData: SheetData = { values: [['Updated data']] };
    jest
      .spyOn(googleSheetsRepository, 'updateValue')
      .mockResolvedValue(mockUpdateData);
    const result = await googleSheetService.updateRow(1, mockUpdateData);
    expect(result).toEqual(mockUpdateData);
    expect(googleSheetsRepository.updateValue).toHaveBeenCalledWith(
      1,
      mockUpdateData,
    );
  });

  it('should fetch all data successfully', async () => {
    const mockRows: SheetData = { values: [['Row data']] };
    jest.spyOn(googleSheetsRepository, 'getRows').mockResolvedValue(mockRows);
    const result = await googleSheetService.getAllData(1, 10);
    expect(result).toEqual(mockRows);
    expect(googleSheetsRepository.getRows).toHaveBeenCalledWith(1, 10);
  });

  it('should delete a row successfully', async () => {
    jest
      .spyOn(googleSheetsRepository, 'deleteRow')
      .mockResolvedValue(undefined);
    await googleSheetService.deleteRow(1);
    expect(googleSheetsRepository.deleteRow).toHaveBeenCalledWith(1);
  });

  it('should find a row successfully', async () => {
    const mockRow: SheetData = { values: [['Row data']] };
    jest.spyOn(googleSheetsRepository, 'getRow').mockResolvedValue(mockRow);
    const result = await googleSheetService.findRow(1);
    expect(result).toEqual(mockRow);
    expect(googleSheetsRepository.getRow).toHaveBeenCalledWith(1);
  });

  it('should fetch patologies successfully', async () => {
    const mockPatologies: SheetData = { values: [['Patology data']] };
    jest
      .spyOn(googleSheetsRepository, 'getColumn')
      .mockResolvedValue(mockPatologies);
    const result = await googleSheetService.getPatologies();
    expect(result).toEqual(mockPatologies);
    expect(googleSheetsRepository.getColumn).toHaveBeenCalledWith(
      "'Página1'!C2:C",
    );
  });

  it('should fetch treatments successfully', async () => {
    const mockTreatments: SheetData = { values: [['Treatment data']] };
    jest
      .spyOn(googleSheetsRepository, 'getColumn')
      .mockResolvedValue(mockTreatments);
    const result = await googleSheetService.getTreatments();
    expect(result).toEqual(mockTreatments);
    expect(googleSheetsRepository.getColumn).toHaveBeenCalledWith(
      "'Página1'!A2:A",
    );
  });

  it('should create a row successfully', async () => {
    const mockData: SheetData = { values: [['New row data']] };
    jest
      .spyOn(googleSheetsRepository, 'createRow')
      .mockResolvedValue(undefined);
    await googleSheetService.createRow(mockData);
    expect(googleSheetsRepository.createRow).toHaveBeenCalledWith(mockData);
  });
});
