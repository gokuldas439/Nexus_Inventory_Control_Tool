import mongoose from 'mongoose'


export const MaterialSchema=new mongoose.Schema({
companyId:{type:mongoose.Types.ObjectId,required:true},
name:{type: String,required:true},
price:{type:Number,required:true},
finalprice:{type:Number,required:true},
unit:{type:String,required:true},
description:{type: String , required:true},
stock:{type:Number,required:true},
// images:{type:Array,required:true},
isDeleted:{type:Boolean}

},{
    timestamps:true
})

const MaterialModel = mongoose.model("Materials", MaterialSchema)

export default MaterialModel;