"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/users"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.users, users_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    connectDB() {
        connection_1.default.authenticate()
            .then(res => {
            console.log("Connection successful");
        })
            .catch(error => {
            console.log(error);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running in port : ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map