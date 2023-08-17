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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const connection_1 = require("../database/connection");
const socket_1 = __importDefault(require("./socket")); // server socket
class Server {
    constructor() {
        this.setupSockets = () => {
            new socket_1.default(this.io);
        };
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, connection_1.databaseConnect)();
        });
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.server);
        this.port = process.env.PORT || '3001';
        this.connect();
        this.routes();
        this.setupSockets();
    }
    routes() {
        // Todo: routes
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map