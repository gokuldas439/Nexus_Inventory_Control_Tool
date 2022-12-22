import { Request } from 'express';
import UserModel from '../../models/company.model'

export enum role{

    company, admin , supplier, client
}


export interface UserInterface {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    number?: string;
    role?: role;
    companyId?:string
  }
  

interface userInfoReq extends Request {
  userDetails?: typeof UserModel;
}


export default userInfoReq;