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
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, express_validator_1.body)('name').notEmpty().withMessage('O campo name é obrigatório').run(req);
            yield (0, express_validator_1.body)('email').notEmpty().withMessage('O email fornecido não é válido').run(req);
            yield (0, express_validator_1.body)('password').isLength({ min: 6, max: 15 }).withMessage('A senha deve ter entre 6 e 15 caracteres').run(req);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            try {
                const newUser = yield this.userService.createUser(name, email, password);
                return res.status(201).json({
                    message: 'Usuário criado com sucesso',
                    data: {
                        _id: newUser._id,
                        email: newUser.email
                    }
                });
            }
            catch (error) {
                return UserController.handleRegistrationError(res, error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, express_validator_1.body)('email').notEmpty().withMessage('O email fornecido não é válido').run(req);
                yield (0, express_validator_1.body)('password').notEmpty().withMessage('A senha é obrigatória').run(req);
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const { email, password, remember } = req.body;
                const token = yield this.userService.authenticate(email, password, remember);
                return res.status(200).json({
                    status: true,
                    message: 'Login bem-sucedido',
                    token,
                });
            }
            catch (error) {
                return UserController.handleRegistrationError(res, error);
            }
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _request = req;
            try {
                const userReadDTO = yield this.userService.getUserInfo(_request.userId);
                return res.status(200).json({
                    status: true,
                    data: userReadDTO,
                });
            }
            catch (error) {
                return UserController.handleRegistrationError(res, error);
            }
        });
    }
    static handleRegistrationError(res, error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Ocorreu interno' });
        }
    }
}
exports.default = UserController;
