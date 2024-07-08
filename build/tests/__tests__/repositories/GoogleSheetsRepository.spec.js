"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SheetsRepositoryImplementation_1 = __importDefault(require("../../../repositories/implementations/SheetsRepositoryImplementation"));
describe('GoogleSheetsRepository', () => {
    let googleSheetsAuthProvider;
    let googleSheetsRepository;
    const mockAuthClient = {
        getClient: jest.fn().mockResolvedValue({ /* mock do cliente de autenticação */})
    };
    const mockUpdateResponse = {
        data: {
            spreadsheetId: 'mocked-spreadsheet-id',
            updatedRange: 'Página1!A1:Z1',
            updatedRows: 1,
            updatedColumns: 2,
            updatedCells: 2,
            updatedData: {},
        }
    };
    const mockAppendResponse = {
        data: {
            spreadsheetId: 'mocked-spreadsheet-id',
            tableRange: 'Sheet1!A2:B2',
            updates: {
                'Sheet1': {
                    'properties': {
                        'title': 'Sheet1'
                    },
                    'data': {
                        'rowData': [
                            {
                                'values': [
                                    { 'userEnteredValue': { 'stringValue': 'John Doe' } },
                                    { 'userEnteredValue': { 'numberValue': 30 } }
                                ]
                            },
                            {
                                'values': [
                                    { 'userEnteredValue': { 'stringValue': 'Jane Smith' } },
                                    { 'userEnteredValue': { 'numberValue': 25 } }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    };
    const mockGetMetadata = jest.fn().mockResolvedValue({
        data: {
            sheets: [
                { title: 'Sheet1', rowCount: 100, columnCount: 10 },
                { title: 'Sheet2', rowCount: 50, columnCount: 5 }
            ]
        }
    });
    const mockRows = jest.fn().mockResolvedValue({
        data: {
            values: [
                ['Name', 'Age'],
                ['John Doe', 30],
                ['Jane Smith', 25]
            ]
        }
    });
    const mockClearResponse = {
        data: 'Deleted successfully'
    };
    const mockSheets = {
        spreadsheets: {
            get: mockGetMetadata,
            values: {
                get: mockRows,
                append: jest.fn().mockResolvedValue(mockAppendResponse), // Adicionando o mock para append aqui,,
                clear: jest.fn().mockResolvedValue(mockClearResponse), // Mock da função clear()
                update: jest.fn().mockImplementation((params) => {
                    // Verifica o range esperado para decidir a resposta
                    if (params.range === 'Página1!A1:Z1' || params.range === 'Página1!A2:Z2') {
                        return Promise.resolve({
                            data: mockUpdateResponse // Responde com a mockResponse esperada
                        });
                    }
                    else {
                        return Promise.reject(new Error('Range not found')); // Rejeita se o range não corresponder
                    }
                })
            }
        }
    };
    beforeAll(() => {
        googleSheetsAuthProvider = {
            getAuth() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        auth: mockAuthClient,
                        googleSheets: mockSheets,
                        spreadsheetId: 'mocked-spreadsheet-id'
                    };
                });
            }
        };
        googleSheetsRepository = new SheetsRepositoryImplementation_1.default(googleSheetsAuthProvider);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should fetch metadata successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const metadata = yield googleSheetsRepository.getMetadata();
        expect(mockGetMetadata).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id'
        });
        expect(metadata).toEqual({
            sheets: [
                { title: 'Sheet1', rowCount: 100, columnCount: 10 },
                { title: 'Sheet2', rowCount: 50, columnCount: 5 }
            ]
        });
    }));
    it('should fetch rows successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const pageNumber = 1;
        const pageSize = 10;
        const rows = yield googleSheetsRepository.getRows(pageNumber, pageSize);
        const startRow = ((pageNumber - 1) * pageSize) + 2;
        const endRow = startRow + pageSize - 1;
        const expectedRange = `'Página1'!A${startRow}:Z${endRow}`;
        expect(mockRows).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: expectedRange,
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING"
        });
        expect(rows).toEqual({
            values: [
                ['Name', 'Age'],
                ['John Doe', 30],
                ['Jane Smith', 25]
            ]
        });
    }));
    it('should throw an error if rows are not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        mockRows.mockRejectedValueOnce(new Error('Data not found!'));
        yield expect(googleSheetsRepository.getRows(1, 10)).rejects.toThrow('Internal server error.');
        consoleErrorSpy.mockRestore();
    }));
    it('should fetch a column successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const range = "'Página1'!C2:C";
        const column = yield googleSheetsRepository.getColumn(range);
        expect(mockRows).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: range,
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING"
        });
        if (column.values) {
            const actualNames = column.values.slice(1).map((row) => row[0]);
            expect(actualNames).toEqual(['John Doe', 'Jane Smith']);
        }
        else {
            fail('Expected patologies.values to not be null or undefined');
        }
    }));
    it('should fetch a row successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const lineId = 2;
        const row = yield googleSheetsRepository.getRow(lineId);
        const range = `Página1!A${lineId}:Z${lineId}`;
        expect(mockRows).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: range,
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING"
        });
        if (row.values) {
            const actualRow = row.values[lineId - 1];
            expect(actualRow).toEqual(['John Doe', 30]);
        }
        else {
            fail('Expected row.values to not be null or undefined');
        }
    }));
    it('should call append and create one or more rows', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputValues = [
            [222, 2222, 22222, 222222, 111111, 111111],
            [333, 2323, 32323, 323232, 212121, 212121]
        ];
        // Chama o método createRow com os dados de teste
        yield googleSheetsRepository.createRow(inputValues);
        // Verifica se o método append foi chamado com os argumentos corretos
        expect(mockSheets.spreadsheets.values.append).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: "Página1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                majorDimension: "ROWS",
                values: inputValues
            }
        });
    }));
    it('should delete a row successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const lineId = 1;
        const deleteRowResponse = yield googleSheetsRepository.deleteRow(lineId);
        const expectedRange = `Página1!A${lineId}:Z${lineId}`;
        expect(mockSheets.spreadsheets.values.clear).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: expectedRange,
        });
        expect(deleteRowResponse).toEqual(mockClearResponse.data);
    }));
    it('should throw an internal server error on failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const lineId = 1;
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        mockSheets.spreadsheets.values.clear.mockImplementationOnce(() => {
            throw new Error('Error deleting row');
        });
        yield expect(googleSheetsRepository.deleteRow(lineId)).rejects.toThrow('Internal server error.');
        const expectedRange = `Página1!A${lineId}:Z${lineId}`;
        expect(mockSheets.spreadsheets.values.clear).toHaveBeenCalledWith({
            auth: mockAuthClient,
            spreadsheetId: 'mocked-spreadsheet-id',
            range: expectedRange,
        });
        consoleErrorSpy.mockRestore();
    }));
    it('should update a row successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Reset or reinitialize the repository instance if necessary
        // This ensures the test starts with a clean slate
        // Define the old data within the test case to ensure it's accurate
        const oldData = [['Name', 'Age'], ['Jane Smith', 25]]; // Include the header and the initial data
        const lineId = 1; // Assuming this is the correct line ID based on your setup
        const valuesToUpdate = [['Jane Smith', 50]]; // Update age to 50
        // Perform the update operation
        const updatedRow = yield googleSheetsRepository.updateValue(lineId, valuesToUpdate);
        // Compare the updated row with the old data
        expect(updatedRow).not.toEqual(oldData);
    }));
    it('should perform CRUD operations on Google Sheets successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Input data definition
        const lineId = 2; // Line to be updated
        const pageNumber = 1;
        const pageSize = 10;
        const inputValues = [
            [222, 2222, 22222, 222222, 111111, 111111],
            [333, 2323, 32323, 323232, 212121, 212121]
        ];
        // 1. Creating a new row
        const response = yield googleSheetsRepository.createRow(inputValues);
        expect(response).toBe('Row created successfully');
        // 2. Getting all rows on the specified page
        const rows = yield googleSheetsRepository.getRows(pageNumber, pageSize);
        expect(rows).toEqual({
            values: [
                ['Name', 'Age'], // Expects the first row to be the header
                ['John Doe', 30], // Verifies if the inserted data is present
                ['Jane Smith', 25]
            ]
        });
        // 3. Getting a specific row by ID
        const row = yield googleSheetsRepository.getRow(lineId);
        if (row.values) {
            const actualRow = row.values[lineId - 1];
            expect(actualRow).toEqual(['John Doe', 30]); // Verifies if the updated row has the expected values
        }
        else {
            fail('Expected row.values to not be null or undefined');
        }
        // 4. Getting a specific column
        const range = "'Página1'!C2:C"; // Range of the column to be fetched
        const column = yield googleSheetsRepository.getColumn(range);
        if (column.values) {
            const actualNames = column.values.slice(1).map((row) => row[0]); // Ignores the header
            expect(actualNames).toEqual(['John Doe', 'Jane Smith']); // Verifies if the names in the column are as expected
        }
        else {
            fail('Expected column.values to not be null or undefined');
        }
        // 5. Deleting a specific row
        const deleteRowResponse = yield googleSheetsRepository.deleteRow(lineId);
        expect(deleteRowResponse).toEqual('Deleted successfully'); // Verifies if the row was deleted successfully
        // 6. Updating a specific row
        const oldData = [['Name', 'Age'], ['Jane Smith', 25]]; // Old data including the header
        const valuesToUpdate = [['Jane Smith', 50]]; // Update age to 50
        const updatedRow = yield googleSheetsRepository.updateValue(lineId, valuesToUpdate);
        // Verifies if the row was updated correctly by comparing with the old data
        expect(updatedRow).not.toEqual(oldData);
    }));
});
