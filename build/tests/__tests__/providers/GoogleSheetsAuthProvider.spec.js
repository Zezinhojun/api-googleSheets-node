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
const SheetsAuthProvider_1 = __importDefault(require("../../../providers/implementations/SheetsAuthProvider"));
describe("GoogleSheetsAuthProvider", () => {
    let googleSheetsAuthProvider;
    beforeAll(() => {
        googleSheetsAuthProvider = new SheetsAuthProvider_1.default();
    });
    it("should authenticate and get Google Sheets instance", () => __awaiter(void 0, void 0, void 0, function* () {
        const authData = yield googleSheetsAuthProvider.getAuth();
        expect(authData).toHaveProperty("auth");
    }));
    it("should handle authentication errors", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(googleSheetsAuthProvider["auth"], "getClient").mockRejectedValueOnce(new Error("fail is not defined"));
        try {
            yield googleSheetsAuthProvider.getAuth();
            fail('Expected getAuth() to throw an error');
        }
        catch (error) {
            expect(error instanceof Error).toBeTruthy();
            expect(error.message).toBe("fail is not defined");
        }
    }));
});
