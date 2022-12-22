import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ClientModel from "../../models/client.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import SupplierModel from "../../models/supplier.model";
import nodemailer from 'nodemailer'
import MaterialModel from "../../models/materials.model";
import ProductModel from "../../models/products.model";
// login page get request..............

let transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
  }
})



export const companylogin=(req:Request,res:Response)=>{
  // const sgMail = require('@sendgrid/mail')
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
// const msg = {
//   to: 'gokuldas439@gmail.com', // Change to your recipient
//   from: 'nexuscompany439@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
transporter.sendMail({
  from: "nexuscompany439@gmail.com", // verified sender email
  to: "gokuldas439@gmail.com", // recipient email
  subject: "Test message subject", // Subject line
  text: "Hello world!", // plain text body
  html: "<b>Hello world!</b>", // html body
}, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});





res.status(200).json({
    message:"hiiii"
})
};






interface reqBody{
    _id:String;
}

export const getClients=asyncHandler(async(req:Request,res:Response)=>{
const {_id}=req.user as reqBody;

const clientData=await ClientModel.find({companyId:_id});
console.log(clientData);
if(clientData){
res.status(200).json({
    data:clientData
})
}else{
    res.status(301)
    throw new Error('No Clients are Added')
}
}
);




export const getSuppliers=asyncHandler(async(req:Request,res:Response)=>{
    
const {_id}=req.user as reqBody;


const clientData=await SupplierModel.find({companyId:_id});
console.log(clientData)
if(clientData){
res.status(200).json({
    data:clientData
})
}else{
    res.status(301)
    throw new Error('No Clients are Added')
}
});



// get the materials

export const getMaterials=asyncHandler(async(req:Request,res:Response)=>{
    
  const {_id}=req.user as reqBody;
  
  
  const clientData=await MaterialModel.find({companyId:_id});
  console.log(clientData)
  if(clientData){
  res.status(200).json({
      data:clientData
  })
  }else{
      res.status(301)
      throw new Error('No Clients are Added')
  }
  });



export const getProducts=asyncHandler(async(req:Request,res:Response)=>{
    
  const {_id}=req.user as reqBody;
  
  
  const clientData=await ProductModel.find({companyId:_id}).populate('materialId');

  console.log(clientData)
  if(clientData){
  res.status(200).json({
      data:clientData
  })
  }else{
      res.status(301)
      throw new Error('No Clients are Added')
  }
  });
  
  
  









