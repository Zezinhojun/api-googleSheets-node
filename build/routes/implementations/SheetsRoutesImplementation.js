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
exports.SheetsRoutesImplementation = void 0;
class SheetsRoutesImplementation {
    constructor(googleSheetsController) {
        this.googleSheetsController = googleSheetsController;
        this.getMetadata = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.createRow(request, response);
        });
        this.getRows = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.getRows(response, request);
        });
        this.getPatology = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.getPatologies(request, response);
        });
        this.getTreatments = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.getTreatments(request, response);
        });
        this.createRow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.createRow(request, response);
        });
        this.updateValue = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.updatedValue(request, response);
        });
        this.findByRowIndex = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.findRow(request, response);
        });
        this.deleteRow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            yield this.googleSheetsController.deleteRow(request, response);
        });
    }
}
exports.SheetsRoutesImplementation = SheetsRoutesImplementation;
