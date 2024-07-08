"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReadDTO = exports.CreateUserDTO = void 0;
const crypto_1 = __importDefault(require("crypto"));
class CreateUserDTO {
    constructor(name, email, password) {
        this._id = crypto_1.default.randomUUID().toString();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
exports.CreateUserDTO = CreateUserDTO;
class UserReadDTO {
    constructor(user) {
        this._id = user._id.toString();
        this.name = user.name;
        this.email = user.email;
    }
}
exports.UserReadDTO = UserReadDTO;
