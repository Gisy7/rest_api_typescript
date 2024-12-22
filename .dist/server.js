"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const morgan_1 = __importDefault(require("morgan"));
// Conectar a la base de datos
async function connectDb() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        // console.log(colors.bgGreen.white.bold("conexion existosa"));
    }
    catch (error) {
        // console.log(error);
        // console.log(colors.bgRed.white("se ha producido un error a la hora de conectar a la base de datos"));
    }
}
connectDb();
// instancia de express
const server = (0, express_1.default)();
// Habilitar cors
const corsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
// Leer datos de formularios
server.use(express_1.default.json());
// Ver logs 
server.use((0, morgan_1.default)("dev"));
// Rutas de la api
server.use("/api", router_1.default);
// DOCS de la API
server.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_1.options)));
exports.default = server;
//# sourceMappingURL=server.js.map