"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
class ApiExpress {
    static build() {
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use(express_1.default.static('public'));
        return new ApiExpress(app);
    }
    constructor(app) {
        this.app = app;
    }
    addGetRoute(path, handle) {
        this.app.get(path, handle);
    }
    addPostRoute(path, handle) {
        this.app.post(path, handle);
    }
    start(port) {
        this.app.listen(port, () => {
            console.log("Server running on port " + port);
            this.printRoutes();
        });
    }
    printRoutes() {
        const routes = this.app._router.stack.filter((route) => route.route).map((route) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method,
            };
        });
        console.log(routes);
    }
}
exports.ApiExpress = ApiExpress;
