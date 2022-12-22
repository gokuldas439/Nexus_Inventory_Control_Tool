"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCompanylogin = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const company_model_1 = __importDefault(require("../../models/company.model"));
// Generate JWT
const generateCompanyToken = (id) => {
    const data = {
        id,
        role: 'company'
    };
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const authCompanylogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next((0, http_errors_1.default)(400, 'please Enter the Required Fields'));
    }
    else {
        const userExist = await company_model_1.default.findOne({ email });
        console.log(userExist);
        if (userExist?.isActive == true && await bcrypt_1.default.compare(password, userExist?.password)) {
            console.log("hiiiii");
            res.status(200).json({
                message: "success",
                _id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                role: 'company',
                token: generateCompanyToken(userExist.id),
            });
        }
        else {
            res.status(401).json({
                message: "Invalid credentials..."
            });
        }
    }
};
exports.authCompanylogin = authCompanylogin;
