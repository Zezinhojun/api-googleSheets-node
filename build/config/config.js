"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    production: process.env.PRODUCTION,
    JwtSecret: process.env.JWT_SECRET
};
exports.default = config;
