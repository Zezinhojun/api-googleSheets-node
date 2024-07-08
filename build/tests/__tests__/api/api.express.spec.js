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
const supertest_1 = __importDefault(require("supertest"));
const api_express_1 = require("../../../api/express/api.express");
describe('ApiExpress', () => {
    let api;
    let app;
    beforeAll(() => {
        api = api_express_1.ApiExpress.build();
        app = api.app;
        api.addGetRoute('/test-get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.status(200).send({ message: 'GET success' });
        }));
        api.addPostRoute('/test-post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { message } = req.body;
            res.status(200).send({ received: message });
        }));
    });
    it("should respond with 200 on GET /test-get", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/test-get");
        expect(response.status).toBe(200);
    }));
    it("should respond with 200 on POST /test-post", () => __awaiter(void 0, void 0, void 0, function* () {
        const postData = { message: "Hello, world!" };
        const response = yield (0, supertest_1.default)(app)
            .post("/test-post")
            .send(postData)
            .set("Accept", "application/json");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ received: "Hello, world!" });
    }));
    it("should respond with 404 for undefined route", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/undefined-route");
        expect(response.status).toBe(404);
    }));
});
