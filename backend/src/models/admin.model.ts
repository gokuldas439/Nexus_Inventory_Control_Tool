import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'


export const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number:{type: Number,required:true},
    password: { type: String, required: true },
    isActive:{type: Boolean},
},{
timestamps: true
})

const AdminModel = mongoose.model("Admin", AdminSchema)

export default AdminModel;