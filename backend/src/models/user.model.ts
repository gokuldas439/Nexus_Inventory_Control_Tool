import mongoose from 'mongoose'


export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number:{type: Number,required:true},
    password: { type: String, required: true },
    isActive:{type: Boolean},
},{
timestamps: true
})

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel;