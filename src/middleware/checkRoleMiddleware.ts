import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";
import { secretkey } from "../utils/helper";
type Role = 'admin' | 'user';
type userRole={
    role:Role,
    _id:string,
    email:string,
}

export interface ChechRole extends Request{
    user?:userRole
}

export const checkRoleMiddleware= async (req:ChechRole,res:Response,next:NextFunction)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader)
            return ResponseService({
            status:401,
            res,
            message:"Authorization missing with role admin"
        })
    
    const token= authHeader.split(' ')[1];
    const decoded=jwt.verify(token,secretkey) as userRole
    console.log('Token :',decoded);

    req.user=decoded

    if(decoded.role!=='admin'){
        return ResponseService({
            status:403,
            res,
            message:"only admin can to this. thanks"
        })
    }
    next()
    }

 catch (error) {
    const {message,stack}=error as Error
    return ResponseService({
        res,
        data:stack,
        message:"Invalid or expired token",
        status:401
    })
        
    }
}