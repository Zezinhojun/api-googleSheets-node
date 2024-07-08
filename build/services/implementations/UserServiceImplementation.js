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
exports.UserServiceImplementation = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../config/config"));
const user_1 = require("../../entities/user");
class UserServiceImplementation {
    constructor(userRepository, hashProvider) {
        this.userRepository = userRepository;
        this.hashProvider = hashProvider;
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error("Um usuário com esse e-mail já existe.");
            }
            const hashedPassword = yield this.hashProvider.generateHash(password);
            const userDto = new user_1.CreateUserDTO(name, email, hashedPassword);
            const newUser = yield this.userRepository.create(userDto);
            return newUser;
        });
    }
    authenticate(email, password, remember) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const isPasswordMatch = yield this.hashProvider.compareHash(password, user.password);
            if (!isPasswordMatch) {
                throw new Error("Senha incorreta.");
            }
            let tokenExpiration = remember ? '7d' : '1d';
            const token = (0, jsonwebtoken_1.sign)({ sub: user._id }, config_1.default.JwtSecret, {
                expiresIn: tokenExpiration
            });
            return token;
        });
    }
    getUserInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const userReadDTO = new user_1.UserReadDTO(user);
            return userReadDTO;
        });
    }
}
exports.UserServiceImplementation = UserServiceImplementation;
