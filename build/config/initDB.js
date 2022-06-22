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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
require("colors");
const mongoose_1 = require("mongoose");
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const { connection } = yield (0, mongoose_1.connect)(process.env.MONGO_URL);
    console.log(`Connected to MongoDB: ${connection.host}|${connection.name}`.inverse);
});
exports.initDB = initDB;
//# sourceMappingURL=initDB.js.map