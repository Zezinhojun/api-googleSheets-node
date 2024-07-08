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
Object.defineProperty(exports, "__esModule", { value: true });
class SheetsServiceImplementation {
    constructor(googleSheetsRepository) {
        this.googleSheetsRepository = googleSheetsRepository;
    }
    getMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metadata = yield this.googleSheetsRepository.getMetadata();
                return metadata;
            }
            catch (error) {
                throw new Error(`Error fetching metadata: ${error.message}`);
            }
        });
    }
    updateRow(lineId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rowUpdated = yield this.googleSheetsRepository.updateValue(lineId, updateData);
                return rowUpdated;
            }
            catch (error) {
                throw new Error(`Error updating rows data: ${error.message}`);
            }
        });
    }
    getAllData(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.googleSheetsRepository.getRows(pageNumber, pageSize);
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching rows data: ${error.message}`);
            }
        });
    }
    deleteRow(lineId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.googleSheetsRepository.deleteRow(lineId);
            }
            catch (error) {
                throw new Error(`Error deleting row: ${error.message}`);
            }
        });
    }
    findRow(lineId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const row = yield this.googleSheetsRepository.getRow(lineId);
                return row;
            }
            catch (error) {
                throw new Error(`Error fetching row data: ${error.message}`);
            }
        });
    }
    getPatologies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const range = "'Página1'!C2:C";
                const patologies = yield this.googleSheetsRepository.getColumn(range);
                return patologies;
            }
            catch (error) {
                throw new Error(`Error fetching treatment data: ${error.message}`);
            }
        });
    }
    getTreatments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const range = "'Página1'!A2:A";
                const treatments = yield this.googleSheetsRepository.getColumn(range);
                return treatments;
            }
            catch (error) {
                throw new Error(`Error fetching treatment data: ${error.message}`);
            }
        });
    }
    createRow(sheetData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.googleSheetsRepository.createRow(sheetData);
            }
            catch (error) {
                throw new Error(`Failed to create row: ${error.message}`);
            }
        });
    }
}
exports.default = SheetsServiceImplementation;
