import { NextFunction, Request,Response } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";
import { secretkey } from "../utils/helper";
type Role='admin'|'user'
type userProp={
    role:Role,
    _id:String,
    email:String
}
export interface CheckUserRole extends Request{
    user?:userProp
}

export const commentMiddleware=async(req:CheckUserRole,res:Response, next:NextFunction)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return ResponseService({
                status:401,
                res,
                message:"Authorization needed"
            })
        }
        const token=authHeader.split(' ')[1];
        const decoded=jwt.verify(token,secretkey) as userProp
        console.log('Token contains',decoded);
        req.user=decoded

        if(decoded.role==='admin'){
           return ResponseService({
                res,
                status:403,
                message:"comment is for user only not for admin"
            })
        }
        next();
    } catch (error) {
        const {message,stack}=error as Error
      return ResponseService({
            res,
            data:stack,
            message,
            status:401
        })
        
    }

}