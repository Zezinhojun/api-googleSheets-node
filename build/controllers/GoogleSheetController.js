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
class GoogleSheetsController {
    constructor(sheetServiceImplementation) {
        this.sheetServiceImplementation = sheetServiceImplementation;
        this.getMetadata = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const metadata = yield this.sheetServiceImplementation.getMetadata();
                response.send(metadata);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.getRows = (response, request) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pageNumber } = request.query;
                const parsedPageNumber = Number(pageNumber) || 1;
                const pageSize = 500;
                const rows = yield this.sheetServiceImplementation.getAllData(parsedPageNumber, pageSize);
                response.send(rows);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.getPatologies = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patologies = yield this.sheetServiceImplementation.getPatologies();
                response.send(patologies);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.getTreatments = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const treatments = yield this.sheetServiceImplementation.getTreatments();
                response.send(treatments);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error.' });
            }
        });
        this.createRow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { values } = request.body;
                const newRow = yield this.sheetServiceImplementation.createRow(values);
                response.send(newRow);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.updatedValue = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { lineId, values } = request.body;
                const updatedRow = yield this.sheetServiceImplementation.updateRow(lineId, values);
                response.send(updatedRow);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.findRow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lineId = Number(request.params.lineId);
                const row = yield this.sheetServiceImplementation.findRow(lineId);
                response.send(row);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
        this.deleteRow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { lineId } = request.body;
                const lineDeleted = yield this.sheetServiceImplementation.deleteRow(lineId);
                response.send(lineDeleted);
            }
            catch (error) {
                response.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = GoogleSheetsController;
