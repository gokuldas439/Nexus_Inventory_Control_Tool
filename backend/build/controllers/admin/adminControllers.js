"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompany = exports.userLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const company_model_1 = __importDefault(require("../../models/company.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.userLogin = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        res.status(401);
        throw new Error("All fields are Required");
    }
    else {
        const userExist = await user_model_1.default.findOne({ email });
        if (userExist?.isActive == true && await bcrypt_1.default.compare(password, userExist.password)) {
            res.status(200).json({
                message: "success",
                _id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                token: generateToken(userExist.id),
                role: 'user'
            });
        }
        else {
            res.status(401);
            throw new Error("Invalid credentials");
        }
    }
});
exports.addCompany = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, number, location, password, accountType } = req.body;
    if (!name || !email || !number || !location || !password || !accountType) {
        res.status(401);
        throw new Error("enter required fields...");
    }
    else {
        const company = await company_model_1.default.findOne({ email });
        if (!company) {
            const join = new Date();
            console.log(join);
            let end;
            if (accountType == "free") {
                end = new Date(new Date().setDate(new Date().getDate() + 15));
            }
            else {
                end = new Date(join.setDate(join.getDate() + 30));
            }
            console.log(end);
            // Hash password
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            // Create user
            const company = await company_model_1.default.create({
                name,
                email,
                number,
                password: hashedPassword,
                location,
                joinedOn: join,
                accountType,
                expiresOn: end,
                isActive: true
            });
            if (company) {
                res.status(201).json({
                    message: "Company is successfully Created..."
                });
            }
            else {
                res.status(401);
                throw new Error('Invalid Company data....');
            }
        }
        else {
            res.status(401);
            throw new Error("Company already exist with this Email...");
        }
    }
});
