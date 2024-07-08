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
const BcryptHashProvider_1 = require("../../../providers/implementations/BcryptHashProvider");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe("HashProvider", () => {
    let bcryptHashProvider;
    beforeAll(() => {
        bcryptHashProvider = new BcryptHashProvider_1.BcryptHashProvider();
    });
    it('should generate a hashed password', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = "password123";
        const hashedPassword = yield bcryptHashProvider.generateHash(password);
        expect(hashedPassword).toBeTruthy();
        expect(typeof hashedPassword).toBe('string');
    }));
    it('should compare hashed and password correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = "password123";
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const isCorrectPassword = yield bcryptHashProvider.compareHash(password, hashedPassword);
        expect(isCorrectPassword).toBe(true);
    }));
    it('should return false when compare incorrect passwords', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = "password123";
        const incorrectPassword = "wrongpassword";
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const isCorrectPassword = yield bcryptHashProvider.compareHash(incorrectPassword, hashedPassword);
        expect(isCorrectPassword).toBe(false);
    }));
});
