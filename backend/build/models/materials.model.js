"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MaterialSchema = new mongoose_1.default.Schema({
    companyId: { type: mongoose_1.default.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    finalprice: { type: Number, required: true },
    unit: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    // images:{type:Array,required:true},
    isDeleted: { type: Boolean }
}, {
    timestamps: true
});
const MaterialModel = mongoose_1.default.model("Materials", exports.MaterialSchema);
exports.default = MaterialModel;
