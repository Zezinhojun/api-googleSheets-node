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
const api_express_1 = require("./api/express/api.express");
const GoogleSheetController_1 = __importDefault(require("./controllers/GoogleSheetController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const mongooseConnection_1 = __importDefault(require("./mongooseDatabase/mongooseConnection"));
const BcryptHashProvider_1 = require("./providers/implementations/BcryptHashProvider");
const SheetsAuthProvider_1 = __importDefault(require("./providers/implementations/SheetsAuthProvider"));
const SheetsRepositoryImplementation_1 = __importDefault(require("./repositories/implementations/SheetsRepositoryImplementation"));
const UserRepositoryImplementation_1 = require("./repositories/implementations/UserRepositoryImplementation");
const SheetsRoutesImplementation_1 = require("./routes/implementations/SheetsRoutesImplementation");
const UserRoutesImplementation_1 = require("./routes/implementations/UserRoutesImplementation");
const SheetsServiceImplementation_1 = __importDefault(require("./services/implementations/SheetsServiceImplementation"));
const UserServiceImplementation_1 = require("./services/implementations/UserServiceImplementation");
const api = api_express_1.ApiExpress.build();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongooseConnection_1.default)();
        const userRepository = new UserRepositoryImplementation_1.UserRepositoryImplementation();
        const hashProvider = new BcryptHashProvider_1.BcryptHashProvider();
        const userService = new UserServiceImplementation_1.UserServiceImplementation(userRepository, hashProvider);
        const userController = new UserController_1.default(userService);
        const userRoutes = new UserRoutesImplementation_1.UserRoutesImplementation(userController);
        const googleSheetsAuthProvider = new SheetsAuthProvider_1.default();
        const googleSheetsRepository = new SheetsRepositoryImplementation_1.default(googleSheetsAuthProvider);
        const googleSheetsService = new SheetsServiceImplementation_1.default(googleSheetsRepository);
        const googleSheetsController = new GoogleSheetController_1.default(googleSheetsService);
        const googleSheetsRoutes = new SheetsRoutesImplementation_1.SheetsRoutesImplementation(googleSheetsController);
        api.addGetRoute("/api/googlesheets/metadata", googleSheetsRoutes.getMetadata);
        api.addGetRoute("/api/googlesheets/rows", googleSheetsRoutes.getRows);
        api.addGetRoute("/api/googlesheets/patology", googleSheetsRoutes.getPatology);
        api.addGetRoute("/api/googlesheets/row/:lineId", googleSheetsRoutes.findByRowIndex);
        api.addGetRoute("/api/googlesheets/treatments", googleSheetsRoutes.getTreatments);
        api.addPostRoute("/api/googlesheets/addrow", googleSheetsRoutes.createRow);
        api.addPostRoute("/api/googlesheets/updatevalue", googleSheetsRoutes.updateValue);
        api.addPostRoute("/api/googlesheets/dashboard/delete", googleSheetsRoutes.deleteRow);
        api.addPostRoute("/api/users/register", userRoutes.register);
        api.addPostRoute("/api/users/login", userRoutes.login);
        api.addGetRoute("/api/users/me", userRoutes.me);
        api.start(3000);
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
}))();
