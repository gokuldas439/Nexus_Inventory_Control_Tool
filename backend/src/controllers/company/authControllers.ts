import { NextFunction, Request, Response } from "express";
import createError from 'http-errors'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import CompanyModel from "../../models/company.model";


// Generate JWT
const generateCompanyToken = (id:string) => {
  const data={
    id,
    role:'company'
  }
    return jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    })
  }


// login page post request...................................

interface body{
    email:string;
    password:string;
}

export const authCompanylogin=async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body as body;
    if(!email || !password){
       next (createError(400, 'please Enter the Required Fields')  )
      }else{
        const userExist=await CompanyModel.findOne({email})
        console.log(userExist)
        if(userExist?.isActive==true && await bcrypt.compare(password,userExist?.password)){
          console.log("hiiiii")
            res.status(200).json({
              message:"success",
                _id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                role:'company',
                token: generateCompanyToken(userExist.id),
              })
        }else{
            res.status(401).json({
                message:"Invalid credentials..."
            })

       }

    }
    

}


