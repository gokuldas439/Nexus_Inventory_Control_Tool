import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from 'cloudinary';
import CompanyModel from "../../models/company.model";
import UserModel from "../../models/user.model";


// Generate JWT
const generateToken = (id:string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}


// user login in main page...............................................................................
interface body{
  email:string;
  password:string;
}

export const userLogin=asyncHandler(async(req:Request,res:Response)=>{
  const {email,password}=req.body as body;
console.log(req.body)
  if(!email || !password){
    res.status(401)
  throw new Error("All fields are Required")
  }
  else{
    const userExist=await UserModel.findOne({email});
    if(userExist?.isActive==true && await bcrypt.compare(password,userExist.password)){
      res.status(200).json({
        message:"success",
        _id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        token: generateToken(userExist.id),
        role:'user'
      })
    }else{
      res.status(401);
      throw new Error("Invalid credentials")
    }
  }
});





// add company by admin............................................................

interface Companybody{
    name:string;
    email:string;
    number:string;
    location:string;
    password:string;
    accountType:string;
    
  }
  
  export const addCompany=asyncHandler(async (req:Request,res:Response) => {
    const {
      name,
      email,
      number,
      location,
      password,
      accountType
    }=req.body as Companybody
  
    if(!name || !email || !number || !location || !password || !accountType){
      res.status(401);
      throw new Error("enter required fields...");
    }else{
      const company=await CompanyModel.findOne({email})
      if(!company){
            const join=new Date();
            console.log(join)
            let end;
            if(accountType=="free"){
             end=new Date(new Date().setDate(new Date().getDate()+15))
            }else{
              end=new Date(join.setDate(join.getDate()+30))
            }
            console.log(end)
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
    
            // Create user
            const company = await CompanyModel.create({
                name,
                email,
                number,
                password: hashedPassword,
                location,
                joinedOn:join,
                accountType,
                expiresOn:end,
                isActive:true
            })
    
            if (company) {
                res.status(201).json({
                    message:"Company is successfully Created..."
                })
            } else {
                res.status(401)
                throw new Error('Invalid Company data....')
            }
  
  
      }else{
        res.status(401);
        throw new Error("Company already exist with this Email...")
      }
    }
    
  })
  
  
  