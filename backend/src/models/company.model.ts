import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'


export const CompanySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number:{type: Number,required:true},
    password: { type: String, required: true },
    location:{type:String,required:true},
    isActive:{type: Boolean},
    joinedOn:{
        type:Date
    },
    expiresOn:{type:Date},
    accountType:{ type:String }
},{
timestamps: true
})

const CompanyModel = mongoose.model("Company", CompanySchema)

export default CompanyModel;