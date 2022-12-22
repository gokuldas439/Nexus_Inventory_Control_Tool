"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ClientSchema = new mongoose_1.default.Schema({
    // _id:{type:mongoose.Types.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean },
}, {
    timestamps: true
});
const ClientModel = mongoose_1.default.model("Client", exports.ClientSchema);
exports.default = ClientModel;
