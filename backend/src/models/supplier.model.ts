import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'


export const SupplierSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    number:{type: Number,required:true},
    password: { type: String, required: true },
    companyId:{type:mongoose.Types.ObjectId,required:true},
    address:{type: String,required:true},
    location:{type: String,required:true},
    materialId:{type:String,required:true},
    isActive:{type: Boolean},

},{
timestamps: true
})

const SupplierModel = mongoose.model("Supplier", SupplierSchema)

export default SupplierModel;