"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//connect to the database
const initDB_1 = require("./config/initDB");
(0, initDB_1.initDB)();
//# sourceMappingURL=seeder.js.map