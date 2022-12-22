import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import ClientModel from "../../models/client.model";
import SupplierModel from "../../models/supplier.model";
import mongoose from "mongoose";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from 'cloudinary';
import ProductModel from "../../models/products.model";
import MaterialModel from "../../models/materials.model";
import nodemailer from 'nodemailer'
import { UserInterface } from "../../types/userInterface/userTypeInterface";
import sendgrid from '@sendgrid/mail'
// let transporter = nodemailer.createTransport({
//   host: 'smtp.sendgrid.net',
//   port: 587,
//   auth: {
//       user: "apikey",
//       pass: process.env.SENDGRID_API_KEY
//   }
// })



var transporter = nodemailer.createTransport({
  name:'auverse.com',
  service: 'gmail',
  auth: {
    user: "nexuscompany439@gmail.com",
    pass: process.env.SENDGRID_API_KEY
  }
});



        // transporter.sendMail({
        //   from: "nexuscompany439@gmail.com", // verified sender email
        //   to: `gokuldas439@gmail.com`, // recipient email
        //   subject: "Your Credentials", // Subject line
        //   text: "Welcome to Board", // plain text body
        //   html: `<b>email : </b><br><b>Password : </b>`, // html body
        // }, function(error, info){
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });
        // transporter.close();

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

// const sendEmail = {
//   from: 'nexuscompany439@gmail.com',
//   to: 'gokuldas439@gmail.com',
//   subject: 'Sending A Simple Email using Node.js',
//   text: '<html><body>Now is the time for all good men to send Email via Node.js!',
//   html: '<h1>SendGrid Test</h1><p>Now is the time for all good men to send Email via Node.js!</p></body></html>'
// };

// sendgrid.send(sendEmail)
// .then((response) => {
//   console.log('SendGrid Email sent: ' + response)
// })
// .catch((error) => {
//   console.error(error)
// })

// var mailOptions = {
//   from: process.env.EMAIL,
//   to: userDetail.email,
//   subject: 'Thanks for Purchasing from Auverse',
//   text: `Hi ${userDetail.name}, thank you for purchasing from Auverse.
//           Your order ${trackingId.tracking_id} have been confirmed and will be delivered soon...`
//   // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
    
//   } else {
    
//   }
// });


// Generate JWT
const generateToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    })
  }


  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });



  interface reqUser{
    id:String;
  }
  



// post for add user...............................................................................................................

interface Clientbody{
  companyId:string;
    name: string;
    email:string;
    number:string;
    address:string;
    location:string;
    password:string;
}
interface jwtaddClientPayload extends jwt.JwtPayload{
  id:string
}

export const addClient=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  const {id}=req.user as reqUser;


const companyId=id;

const {
    name,
    email,
    password,
    address,
    location,
    number
}=req.body as Clientbody

if (!name || !email || !password || !address || !location || !number) {

    next(createError(400,'Please input all the fields'))
  }else{

    const userExist=await ClientModel.findOne({email,companyId});
    if(!userExist){

          // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const client = await ClientModel.create({
            name,
            email,
            number,
            companyId,
            password: hashedPassword,
            address,
            location,
            isActive:true
        });

        // transporter.sendMail({
        //   from: "nexuscompany439@gmail.com", // verified sender email
        //   to: `${email}`, // recipient email
        //   subject: "Your Credentials", // Subject line
        //   text: "Welcome to Board", // plain text body
        //   html: `<b>email : ${email}</b><br><b>Password : ${password}</b>`, // html body
        // }, function(error, info){
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email sent: ' + info.response);
        //   }
        // });

     

        if (client) {
            res.status(201).json({
                message:"success"
            })
        } else {
            res.status(401)
            throw new Error('Invalid Client data....')
        }

    }else{
      res.status(401);
      throw new Error(" Client Already Exists....");
      
    }
}



});




// patch for edit client.............................
interface ClientEditbody{
    companyId:mongoose.Types.ObjectId;
    _id:mongoose.Types.ObjectId;
    name: string;
    email:string;
    number:number;
    address:string;
    location:string;
    password:string;
}

interface jwteditClientPayload extends jwt.JwtPayload{
  id:string
}
export const editClient=asyncHandler( async(req:Request,res:Response)=>{

  const {id}=req.user as reqUser
console.log(id)
const companyId=id;

  console.log("entered route")
    const {
        _id,
        name,
        email,
        address,
        location,
        number
    }=req.body as ClientEditbody
    
    // console.log(req.body)
    if (!_id || !name || !email || !address || !location || !number ) {
        // next(createError(401,'Please input all the fields'))
        res.status(401)
        throw new Error('Please input all the fields')
      }else{
    console.log(_id)
        const userExist=await ClientModel.findOne({_id});
        const emailExists = await ClientModel.findOne({ email,companyId,_id: { $ne: _id } });
console.log(userExist)

        if (userExist) {
            if (!emailExists) {
              await ClientModel.updateOne({ _id: _id }, {  name, email, address, location, number});
              res.status(200).json({
                message: "success",
              });
            } else {
              res.status(401)
                throw new Error("Client Email already Exists")
            }
          } else {
            res.status(401)
            throw new Error('user doesnot exists')
          }
    }


});


// delete client ..........................................


// interface deleteClient{
//   companyId:mongoose.Types.ObjectId;
// }

export const DeleteClient=asyncHandler(async(req:Request<{id:string}>,res:Response)=>{
    const {id:clientId}=req.params;
    // const {companyId}=req.body as deleteClient
    if(clientId){
      const userExists=await ClientModel.findById(clientId);
  
      if(userExists){
          await ClientModel.deleteOne({_id:clientId});
          res.status(200).json({
            status:"success",
            message:"Client had been deleted successfully..",
          })
        }else{
          res.status(401);
          throw new Error("Something went wrong...")
        }

    }else{
      res.status(401);
      throw new Error("user Doesnot exists....")
    }

});








// post for add Supplier............................................................................................................

interface Supplierbody{
    name: string;
    email:string;
    number:number;
    companyId?:mongoose.Types.ObjectId;
    address:string;
    location:string;
    materialId?:mongoose.Types.ObjectId;
    password:string;
}

interface jwtaddsupPayload extends jwt.JwtPayload{
  id:string
}

export const addSupplier=asyncHandler(async(req:Request,res:Response)=>{

const {_id}=req.user as UserInterface
 
const companyId=_id;


const {
    name,
    email,
    password,
    address,
    location,
    
    number
}=req.body as Supplierbody
// || !materialId
if (!name || !email || !password || !address || !location || !number) {
    res.status(401)
    throw new Error('Please input all the fields')
  }else{

    const supplierExist=await SupplierModel.findOne({email,companyId});
    if(!supplierExist){

          // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create supplier
        const supplier = await SupplierModel.create({
            name,
            email,
            number,
            password: hashedPassword,
            address,
            location,
            materialId :'wood',
            companyId,
            isActive:true
        })

        if (supplier) {
            res.status(201).json({
                message:"success"
            })
        } else {
            res.status(401)
            throw new Error('Invalid Supplier data...')
        }
    }else{
      res.status(401)
            throw new Error(' Supplier already exist...')

    }
}


});




// patch for edit supplier.............................
interface SupplierEditbody{
    _id?:mongoose.Types.ObjectId,
    companyId?:mongoose.Types.ObjectId,
    name?: string;
    email?:string;
    number?:number;
    address?:string;
    location?:string;
    materialId?:mongoose.Types.ObjectId;
    password?:string;
}

interface jwteditPayload extends jwt.JwtPayload{
  id:string
}

export const editSupplier=asyncHandler(async(req:Request,res:Response)=>{

const id=req.user as reqUser
const companyId=id;


  console.log(req.body)
    const {
        _id,
        name,
        email,
        address,
        location,
        // material,
        number,
        // companyId
    }=req.body as SupplierEditbody
    const supplierId=_id
    
    // || !material || !companyId

    if (!name || !email || !address || !location || !number ) {
        res.status(401)
        throw new Error('Please input all the fields')
      }else{


        const userExist=await SupplierModel.findOne({_id:supplierId});
        const emailExists = await SupplierModel.findOne({ email,companyId,_id:{ $ne: supplierId } });


        if (userExist) {
            if (!emailExists) {
              await SupplierModel.updateOne({ _id: supplierId }, {  name, email, address, location, number});
              res.status(200).json({
                message: "success",
              });
            } else {
              res.status(401).json({
                message: "Supplier Email already Exists",
              });
            }
          } else {
            res.status(401).json({
              message: "Supplier doesnot Exists",
            });
          }
    }
 
});


// delete supplier ..........................................

export const DeleteSupplier=asyncHandler(async(req:Request<{id:string}>,res:Response)=>{
    const {id:supplierId}=req.params;
    const userExists=await SupplierModel.findById(supplierId);

    if(userExists){
        await SupplierModel.deleteOne({_id:supplierId});
        res.status(200).json({
          status:"success",
          message:"Supplier had been deleted successfully..",
        })
      }else{
        res.status(401);
        throw new Error("Supplier doesnot exists...")
      }

});




// add product by company......................................................................................
interface addProductbody{
companyId?:mongoose.Types.ObjectId,
name?:string;
price?:string;
finalprice?:string;
color?:string;
description?:string;
stock?:string;
images?:Array<{}>;
materialId?:[];
}

export const addProduct=asyncHandler(async(req:Request,res:Response)=>{
const {id}=req.user as reqUser
console.log(req.body)
console.log("material")
console.log(JSON.stringify(req.body.materialId))
const companyId=id
  const {
    name,
    color,
    description,
    materialId,
    price,
    stock
  }=req.body as addProductbody;

  console.log(materialId)

if(!name || !color || !description || !materialId || !price || !stock ){
  res.status(400);
  throw new Error("Enter the Required Fields");
}else{

  const files = req.files as Express.Multer.File[];
  console.log(files)
  // 
  const urls =  await Promise.all(files.map(async (file) => {
    const { path } = file;
//  main line for uploading..........
try{
  const result = await cloudinary.uploader.upload(file.path)
  return result.secure_url;

}
catch(err){
  console.log(err)
}
  // 
    // 
  }));


let newprice=parseInt(price)
// let newFinalprice=parseInt(finalprice)
let newStock=parseInt(stock)

const product=await ProductModel.create({
   companyId,
    name,
    color,
    description,
    finalprice:newprice,
    materialId,
    price:newprice,
    images:urls,
    stock:newStock,
    isDeleted:false

});

if(product){
  res.status(200).json({
    message:"success"
  })
}else{
  res.status(400)
  throw new Error('something went wrong...')
}
}
});




// edit product by company...............................................................................

interface editProductbody{
  companyId:mongoose.Types.ObjectId,
  productId:mongoose.Types.ObjectId ,
  name:string;
  price:string;
  finalprice:string;
  color:string;
  description:string;
  stock:string;
  images:Array<{}>;
  materialId:Array<{}> | string;
  }


export const editProduct=asyncHandler(async(req:Request,res:Response)=>{
  const {id}=req.user as reqUser
  const companyId=id
  const {
    productId,
    name,
    price,
    color,
    description,
    stock,
    materialId,
}=req.body as editProductbody

if (!name || !price || !color || !description || !stock  || !materialId || !productId) {
    res.status(401)
    throw new Error('Please input all the fields')
  }else{


    const productExist=await ProductModel.findOne({_id:productId,companyId});
    // const emailExists = await ProductModel.findOne({ email,companyId,_id:{ $ne: productId } });


    if (productExist) {           
            const files = req.files as Express.Multer.File[];
            console.log(files)
            // 
            const urls =  await Promise.all(files.map(async (file) => {
              const { path } = file;
          //  main line for uploading..........
          try{
            const result = await cloudinary.uploader.upload(file.path)
            return result.secure_url;
          
          }
          catch(err){
            console.log(err)
          }
            // 
              // 
            }));
            


          let newprice=parseInt(price)
          let newStock=parseInt(stock)
          await ProductModel.updateOne({ _id: productId }, {
            companyId,
            productId,
            name,
            color,
            description,
            finalprice:newprice,
            materialId,
            price:newprice,
            images:urls,
            stock:newStock
          });
          res.status(200).json({
            message: "success",
          });
       
      } else {
        res.status(401).json({
          message: "product doesnot Exists",
        });
      }
}
});



// delete product.....................................................................
interface deleteProduct{
  productId:mongoose.Types.ObjectId
}

export const DeleteProduct=asyncHandler(async(req:Request,res:Response)=>{

  interface jwtPayload extends jwt.JwtPayload{
    id:string
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
      // Get token from header
      let token = req.headers.authorization.split(" ")[1];
console.log(token)
      // Verify token
      const {id}=jwt.verify(
        token!,
        process.env.JWT_SECRET!,
) as jwtPayload

const companyId=id;



  const productId=req.body as deleteProduct;

  const productExists=await ProductModel.findOne({_id:productId,companyId:companyId});

  if(productExists){
      await ProductModel.deleteOne({_id:productId});
      res.status(200).json({
        status:"success",
        message:"product had been deleted successfully..",
      })
    }else{
      res.status(401);
      throw new Error("product doesnot exists...")
    }
  }else{
    res.status(401)
    throw new Error('Product not found')
  }
});








// add materials.........................................................................

interface addMaterialbody{
  companyId:mongoose.Types.ObjectId,
  name:string;
  price:string;
  finalprice:string;
  unit:string;
  description:string;
  stock:string;
  images:Array<{}>;
  }
  
  export const addMaterial=asyncHandler(async(req:Request,res:Response)=>{
  
    const {id}=req.user as reqUser
    const companyId=id;
    const {
      name,
      unit,
      description,
      price,
      stock,
   
  
    }=req.body as addMaterialbody;
  
  if(!name || !unit || !description || !price || !stock ){
    res.status(400);
    throw new Error("Enter the Required Fields");
  }else{
  //   const files = req.files as Express.Multer.File[];
  //   console.log(files)
  //   // 
  //   const urls =  await Promise.all(files.map(async (file) => {
  //     const { path } = file;
  // //  main line for uploading..........
  // try{
  //   const result = await cloudinary.uploader.upload(file.path)
  //   return result.secure_url;
  
  // }
  // catch(err){
  //   console.log(err)
  // }
  //   // 
  //     // 
  //   }));
  
  
  let newprice=parseInt(price)
  // let newFinalprice=parseInt(finalprice)
  let newStock=parseInt(stock)
  
  const product=await MaterialModel.create({
    name,
    price:newprice,
    finalprice:newprice,
    unit,
    description,
    stock:newStock,
    companyId
  });
  
  if(product){
    res.status(200).json({
      message:"success"
    })
  }else{
    res.status(401)
    throw new Error('something went wrong');
  }
  }
  });
  
  
  
  
  // edit material by company...............................................................................
  
  interface editMaterialbody{
    _id:mongoose.Types.ObjectId,
    companyId:mongoose.Types.ObjectId,
    name:string;
    price:string;
    finalprice:string;
    unit:string;
    description:string;
    stock:string;
    images:Array<{}>;
    }
  
  
  export const editMaterial=asyncHandler(async(req:Request,res:Response)=>{
    const {id}=req.user as reqUser
    console.log(req.body)
    const companyId=id;
    const {
      _id,
      name,
      price,
      unit,
      description,
      stock,
      images,
  }=req.body as editMaterialbody
  const materialId=_id;
  
  if (!name || !price || !unit || !description || !stock|| !materialId) {
      res.status(401)
      throw new Error('Please input all the fields')
    }else{
  
  
      const materialExist=await MaterialModel.findOne({_id:materialId,companyId});
      // const emailExists = await ProductModel.findOne({ email,companyId,_id:{ $ne: productId } });
  
  
      if (materialExist) {           
             
              
  
  
            let newprice=parseInt(price)
            // let newFinalprice=parseInt(finalprice)
            let newStock=parseInt(stock)
            await MaterialModel.updateOne({ _id: materialId,companyId}, {
              name,
              unit,
              description,
              finalprice:newprice,
              price:newprice,
              stock:newStock
            });
            res.status(200).json({
              message: "success",
            });
         
        } else {
          res.status(401).json({
            message: "material doesnot Exists",
          });
        }
  }
  });
  
  
  
  // delete material.....................................................................
  
  export const DeleteMaterial=asyncHandler(async(req:Request<{id:string}>,res:Response)=>{
    const {id:materialId}=req.params;
    const materialExists=await MaterialModel.findById(materialId);
  
    if(materialExists){
        await MaterialModel.deleteOne({_id:materialId});
        res.status(200).json({
          status:"success",
          message:"product had been deleted successfully..",
        })
      }else{
        res.status(401);
        throw new Error("product doesnot exists...")
      }
  
  });
  
  