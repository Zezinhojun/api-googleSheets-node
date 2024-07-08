"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config/config"));
const Auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }
    try {
        const parsedText = token.split(" ")[1];
        const decoded = (0, jsonwebtoken_1.verify)(parsedText, config_1.default.JwtSecret);
        const _request = req;
        _request.userId = decoded.sub;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized " });
    }
};
exports.default = Auth;
