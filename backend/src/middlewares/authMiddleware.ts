import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import CompanyModel from "../models/company.model";
// import { role, UserInterface } from "../types/userInterface/userTypeInterface";
import AdminModel from "../models/admin.model";
import ClientModel from "../models/client.model";
import SupplierModel from "../models/supplier.model";
import { userLogin } from "../controllers/admin/adminControllers";




interface jwtcongif extends jwt.JwtPayload {
  id: string;
  role: string;
}
type Role = "admin" | "company"| "client" | "supplier";

export const protect = (role: Role) => {
  console.log("first");
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let token: string | undefined;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          // Get token from header
          token = req.headers.authorization.split(" ")[1];
          console.log(token);
          // Verify token
          const decoder = jwt.verify(
            token!,
            process.env.JWT_SECRET!
          ) as jwtcongif;

          if (decoder.role !== role) {
            res.status(401);
            throw new Error("Not Authorized");
          }
          if (decoder.role === "company") {
            req.user = await CompanyModel.findById(decoder.id).select(
              "-password"
            );
          } else if (decoder.role === "admin") {
            req.user = await AdminModel.findById(decoder.id).select(
              "-password"
            );
          } else if (decoder.role === "client") {
            req.user = await ClientModel.findById(decoder.id).select(
              "-password"
            );
          } else if (decoder.role === "supplier") {
            req.user = await SupplierModel.findById(decoder.id).select(
              "-password"
            );
          } else {
          }
          next();
        } catch (error) {
          console.log(error);
          res.status(401);
          throw new Error("Not authorized");
        }
      }
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
    }
  );
};
