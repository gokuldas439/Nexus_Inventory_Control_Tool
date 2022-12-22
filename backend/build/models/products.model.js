"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    finalprice: { type: Number, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: Array, required: true },
    materialId: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Materials', required: true }],
    isDeleted: { type: Boolean }
}, {
    timestamps: true
});
const ProductModel = mongoose_1.default.model("Products", exports.ProductSchema);
exports.default = ProductModel;
