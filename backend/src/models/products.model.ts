import mongoose from 'mongoose'


export const ProductSchema=new mongoose.Schema({
name:{type: String,required:true},
price:{type:Number,required:true},
finalprice:{type:Number,required:true},
color:{type: String,required:true},
description:{type: String , required:true},
stock:{type:Number,required:true},
images:{type:Array,required:true},
materialId:[{type: mongoose.Types.ObjectId,ref:'Materials',required:true}],
isDeleted:{type:Boolean}

},{
    timestamps:true
})

const ProductModel = mongoose.model("Products", ProductSchema)

export default ProductModel;