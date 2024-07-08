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
const UserServiceImplementation_1 = require("../../../services/implementations/UserServiceImplementation");
const hashProviderMock_1 = __importDefault(require("../../__mocks__/hashProviderMock"));
const UserRepositoryMock_1 = __importDefault(require("../../__mocks__/UserRepositoryMock"));
describe("UserService", () => {
    let userService;
    let userRepository;
    let hashProvider;
    beforeEach(() => {
        userRepository = new UserRepositoryMock_1.default();
        hashProvider = new hashProviderMock_1.default();
        userService = new UserServiceImplementation_1.UserServiceImplementation(userRepository, hashProvider);
    });
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        const user = yield userService.createUser(name, email, password);
        expect(user).toHaveProperty('_id');
        expect(user.email).toBe(email);
        expect(user.password).toBe(`hashed-${password}`);
    }));
    it('should not create a user with an existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        yield userService.createUser(name, email, password);
        yield expect(userService.createUser(name, email, password))
            .rejects
            .toThrow("Um usuário com esse e-mail já existe.");
    }));
    it('should authenticate user with correct credencials', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        yield userService.createUser(name, email, password);
        const token = yield userService.authenticate(email, password, false);
        expect(token).toBeDefined();
    }));
    it('should not authenticate user with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        yield userService.createUser(name, email, password);
        yield expect(userService.authenticate(email, 'wrongpassword', false))
            .rejects
            .toThrow('Senha incorreta.');
    }));
    test('should return user info', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = "name";
        const email = "email@email.com";
        const password = "password123";
        const user = yield userService.createUser(name, email, password);
        const userInfo = yield userService.getUserInfo(user._id);
        if (userInfo) {
            expect(userInfo).toHaveProperty('_id');
            expect(userInfo.email).toBe(email);
        }
        else {
            console.log('User not found'); // Log para diagnóstico
        }
    }));
});
