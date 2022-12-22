"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
console.log("first" + process.env.MONGO_URI);
const connectDB = async () => {
    try {
        const add = 'red';
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("\x1b[33m%s\x1b[0m", `MongoDB Connected: ${conn.connection.host}`);
        // Colors.colors("red","redd")
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
