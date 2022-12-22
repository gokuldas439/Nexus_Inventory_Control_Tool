"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
exports.default = (err, req, res, next) => {
    // Sending error message
    res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(err.status || res.statusCode || 500);
    console.error(colors_1.default.red(`\n \n URL:${req.url}\n Message:${err.message}`) +
        colors_1.default.yellow(`\n Stack:${err.stack} \n \n`));
    res.json({
        message: err.message,
        details: {
            stack: req.app.get('env') === 'development' ? err.stack : {}
        }
    });
};
