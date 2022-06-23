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
const app = (0, express_1.default)();
//load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//connect to the database
const initDB_1 = require("./config/initDB");
(0, initDB_1.initDB)();
//load database models
require("./models/post.model");
require("./models/user.model");
//setup body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//setup cors
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
//setup static files
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//setup express file upload
const express_fileupload_1 = __importDefault(require("express-fileupload"));
app.use((0, express_fileupload_1.default)());
//import routes
const routes_1 = __importDefault(require("./routes/routes"));
app.use("/api/v1", routes_1.default);
//setup error handler
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
app.use(errorHandler_middleware_1.errorHandler);
//start server
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || "3000";
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
//handle unhandle rejection
process.on("unhandledRejection", (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(err);
    yield server.close();
    process.exit(1);
}));
//# sourceMappingURL=app.js.map