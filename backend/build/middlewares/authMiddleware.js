"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const company_model_1 = __importDefault(require("../models/company.model"));
// import { role, UserInterface } from "../types/userInterface/userTypeInterface";
const admin_model_1 = __importDefault(require("../models/admin.model"));
const client_model_1 = __importDefault(require("../models/client.model"));
const supplier_model_1 = __importDefault(require("../models/supplier.model"));
const protect = (role) => {
    console.log("first");
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                // Get token from header
                token = req.headers.authorization.split(" ")[1];
                console.log(token);
                // Verify token
                const decoder = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (decoder.role !== role) {
                    res.status(401);
                    throw new Error("Not Authorized");
                }
                if (decoder.role === "company") {
                    req.user = await company_model_1.default.findById(decoder.id).select("-password");
                }
                else if (decoder.role === "admin") {
                    req.user = await admin_model_1.default.findById(decoder.id).select("-password");
                }
                else if (decoder.role === "client") {
                    req.user = await client_model_1.default.findById(decoder.id).select("-password");
                }
                else if (decoder.role === "supplier") {
                    req.user = await supplier_model_1.default.findById(decoder.id).select("-password");
                }
                else {
                }
                next();
            }
            catch (error) {
                console.log(error);
                res.status(401);
                throw new Error("Not authorized");
            }
        }
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    });
};
exports.protect = protect;
