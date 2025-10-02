"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
dotenv_1.default.config();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5001;
const app = (0, express_1.default)();
// db connection
(0, db_1.connectDb)();
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
});
