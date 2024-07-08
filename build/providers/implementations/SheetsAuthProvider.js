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
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const serviceAccountPath = path_1.default.resolve(__dirname, "./../../../credentials.json");
class SheetAuthProvider {
    constructor() {
        var _a;
        this.spreadsheetId = (_a = process.env.SPREADSHEET_ID) !== null && _a !== void 0 ? _a : "";
        this.auth = new google_auth_library_1.GoogleAuth({
            keyFile: serviceAccountPath,
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        });
    }
    initAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.auth.getClient();
            if (!(client instanceof google_auth_library_1.OAuth2Client)) {
                throw new Error('Client is not an OAuth2Client.');
            }
            this.googleSheets = googleapis_1.google.sheets({ version: 'v4', auth: client });
        });
    }
    getAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.googleSheets) {
                yield this.initAuth();
            }
            return {
                auth: this.auth,
                client: this.auth,
                googleSheets: this.googleSheets,
                spreadsheetId: this.spreadsheetId
            };
        });
    }
}
exports.default = SheetAuthProvider;
