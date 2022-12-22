import mongoose from 'mongoose'
import config from 'config'


export const ClientSchema = new mongoose.Schema({
    // _id:{type:mongoose.Types.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true },
    number:{type: Number,required:true},
    companyId:{type:mongoose.Types.ObjectId,required:true},
    address:{type:String,required:true},
    location:{type:String,required:true},
    password: { type: String, required: true },
     isActive:{type: Boolean},
},{
timestamps: true
})

const ClientModel = mongoose.model("Client", ClientSchema)

export default ClientModel;