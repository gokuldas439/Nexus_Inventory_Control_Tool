"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CompanySchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean },
    joinedOn: {
        type: Date
    },
    expiresOn: { type: Date }
}, {
    timestamps: true
});
const CompanyModel = mongoose_1.default.model("Company", exports.CompanySchema);
exports.default = CompanyModel;
