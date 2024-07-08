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
const SheetsServiceImplementation_1 = __importDefault(require("../../../services/implementations/SheetsServiceImplementation"));
const sheetsAuthProviderMock_1 = __importDefault(require("../../__mocks__/sheetsAuthProviderMock"));
const SheetsRepositoryMock_1 = __importDefault(require("../../__mocks__/SheetsRepositoryMock"));
describe("GoogleSheetsService", () => {
    let googleSheetsRepository;
    let googleSheetsAuthProvider;
    let googleSheetService;
    beforeEach(() => {
        googleSheetsAuthProvider = new sheetsAuthProviderMock_1.default();
        googleSheetsRepository = new SheetsRepositoryMock_1.default(googleSheetsAuthProvider);
        googleSheetService = new SheetsServiceImplementation_1.default(googleSheetsRepository);
        jest.spyOn(googleSheetsRepository, 'getMetadata').mockResolvedValue({ sheets: [{ properties: { title: 'Página1' } }] });
    });
    it("should fetch metadata successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(googleSheetsRepository, 'getMetadata').mockResolvedValue({ sheets: [{ properties: { title: 'Página1' } }] });
        const result = yield googleSheetService.getMetadata();
        expect(result).toEqual({ sheets: [{ properties: { title: 'Página1' } }] });
        expect(googleSheetsRepository.getMetadata).toHaveBeenCalled();
    }));
    it("should update a row successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUpdateData = { values: [['Updated data']] };
        jest.spyOn(googleSheetsRepository, 'updateValue').mockResolvedValue(mockUpdateData);
        const result = yield googleSheetService.updateRow(1, mockUpdateData);
        expect(result).toEqual(mockUpdateData);
        expect(googleSheetsRepository.updateValue).toHaveBeenCalledWith(1, mockUpdateData);
    }));
    it("should fetch all data successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRows = { values: [['Row data']] };
        jest.spyOn(googleSheetsRepository, 'getRows').mockResolvedValue(mockRows);
        const result = yield googleSheetService.getAllData(1, 10);
        expect(result).toEqual(mockRows);
        expect(googleSheetsRepository.getRows).toHaveBeenCalledWith(1, 10);
    }));
    it("should delete a row successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(googleSheetsRepository, 'deleteRow').mockResolvedValue(undefined);
        yield googleSheetService.deleteRow(1);
        expect(googleSheetsRepository.deleteRow).toHaveBeenCalledWith(1);
    }));
    it("should find a row successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRow = { values: [['Row data']] };
        jest.spyOn(googleSheetsRepository, 'getRow').mockResolvedValue(mockRow);
        const result = yield googleSheetService.findRow(1);
        expect(result).toEqual(mockRow);
        expect(googleSheetsRepository.getRow).toHaveBeenCalledWith(1);
    }));
    it("should fetch patologies successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPatologies = { values: [['Patology data']] };
        jest.spyOn(googleSheetsRepository, 'getColumn').mockResolvedValue(mockPatologies);
        const result = yield googleSheetService.getPatologies();
        expect(result).toEqual(mockPatologies);
        expect(googleSheetsRepository.getColumn).toHaveBeenCalledWith("'Página1'!C2:C");
    }));
    it("should fetch treatments successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTreatments = { values: [['Treatment data']] };
        jest.spyOn(googleSheetsRepository, 'getColumn').mockResolvedValue(mockTreatments);
        const result = yield googleSheetService.getTreatments();
        expect(result).toEqual(mockTreatments);
        expect(googleSheetsRepository.getColumn).toHaveBeenCalledWith("'Página1'!A2:A");
    }));
    it("should create a row successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockData = { values: [['New row data']] };
        jest.spyOn(googleSheetsRepository, 'createRow').mockResolvedValue(undefined);
        yield googleSheetService.createRow(mockData);
        expect(googleSheetsRepository.createRow).toHaveBeenCalledWith(mockData);
    }));
});
