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
class SheetRepositoryImplementation {
    constructor(sheetsAuthProvider) {
        this.sheetsAuthProvider = sheetsAuthProvider;
    }
    updateValue(lineId, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleSheets, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const range = `Página1!A${lineId}:Z${lineId}`;
                const response = yield googleSheets.spreadsheets.values.update({
                    spreadsheetId,
                    range,
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: values,
                    },
                });
                const updatedRow = response.data;
                return updatedRow;
            }
            catch (error) {
                console.error('Error editing row:', error);
                throw new Error('Internal server error.');
            }
        });
    }
    deleteRow(lineId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const range = `Página1!A${lineId}:Z${lineId}`;
                const clearValuesResponse = yield googleSheets.spreadsheets.values.clear({
                    auth,
                    spreadsheetId,
                    range: range,
                });
                return clearValuesResponse.data;
            }
            catch (error) {
                throw new Error('Internal server error.');
            }
        });
    }
    getRow(lineId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const range = `Página1!A${lineId}:Z${lineId}`;
                const row = yield googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range: range,
                    valueRenderOption: "UNFORMATTED_VALUE",
                    dateTimeRenderOption: "FORMATTED_STRING"
                });
                if (!row.data.values || row.data.values.length === 0) {
                    throw new Error('Data not found!');
                }
                return row.data;
            }
            catch (error) {
                throw new Error('Internal server error.');
            }
        });
    }
    createRow(values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const response = yield googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Página1",
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        majorDimension: "ROWS",
                        values: values
                    }
                });
                return "Row created successfully";
            }
            catch (error) {
                throw new Error('Internal server error.');
            }
        });
    }
    getColumn(range) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const response = yield googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range,
                    valueRenderOption: "UNFORMATTED_VALUE",
                    dateTimeRenderOption: "FORMATTED_STRING"
                });
                const data = response.data;
                if (!(data === null || data === void 0 ? void 0 : data.values)) {
                    throw new Error('Data not found.');
                }
                return data;
            }
            catch (error) {
                console.error(`Error fetching data from range ${range}:`, error);
                throw new Error('Internal server error.');
            }
        });
    }
    getRows(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const pageNumberInt = Math.floor(pageNumber);
                const startRow = ((pageNumberInt - 1) * pageSize) + 2;
                const endRow = startRow + pageSize - 1;
                let range = `'Página1'!A${startRow}:Z${endRow}`;
                const getRows = yield googleSheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range: range,
                    valueRenderOption: "UNFORMATTED_VALUE",
                    dateTimeRenderOption: "FORMATTED_STRING"
                });
                if (!((_a = getRows === null || getRows === void 0 ? void 0 : getRows.data) === null || _a === void 0 ? void 0 : _a.values)) {
                    throw new Error('Data not found!');
                }
                return getRows.data;
            }
            catch (error) {
                console.error('Error fetching rows:', error);
                throw new Error('Internal server error.');
            }
        });
    }
    getMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { googleSheets, auth, spreadsheetId } = yield this.sheetsAuthProvider.getAuth();
                const metadata = yield googleSheets.spreadsheets.get({
                    auth, spreadsheetId
                });
                if (!((_a = metadata === null || metadata === void 0 ? void 0 : metadata.data) === null || _a === void 0 ? void 0 : _a.sheets)) {
                    throw new Error('Metadata not found!');
                }
                return metadata.data;
            }
            catch (error) {
                console.error('Error fetching metadata:', error);
                throw new Error('Internal server error.');
            }
        });
    }
}
exports.default = SheetRepositoryImplementation;
