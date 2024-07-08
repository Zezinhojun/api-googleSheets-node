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
const UserRepositoryMock_1 = __importDefault(require("../../__mocks__/UserRepositoryMock"));
describe('UserRepository', () => {
    let userRepository;
    beforeAll(() => {
        userRepository = new UserRepositoryMock_1.default();
    });
    it('should find a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        const mockUser = {
            _id: "1",
            name,
            email,
            password
        };
        yield userRepository.create(mockUser);
        const foundUser = yield userRepository.findByEmail(email);
        expect(foundUser).toBeDefined();
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.email).toBe(email);
    }));
    it('should return null when user is not found by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = "undefined@email.com";
        const foundUser = yield userRepository.findByEmail(email);
        expect(foundUser).toBeNull();
    }));
    it('should find a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        const mockUser = {
            _id: "1",
            name,
            email,
            password
        };
        yield userRepository.create(mockUser);
        const foundUser = yield userRepository.findById("1");
        expect(foundUser).toBeDefined();
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.name).toBe(name);
    }));
    it('should return null when user is not found by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "undefined";
        const foundUser = yield userRepository.findById(userId);
        expect(foundUser).toBeNull();
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        const mockUser = {
            _id: "1",
            name,
            email,
            password
        };
        const newUser = yield userRepository.create(mockUser);
        expect(newUser._id).toBeDefined();
        expect(newUser).toMatchObject(mockUser);
    }));
});
