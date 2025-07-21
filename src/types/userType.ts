import { Request, Response } from "express";

 export interface userInterface{
 name:string,
 email:string,
 role:'admin'|'user',
 gender:'male'|'female'|'others',
 password:string
}

export interface createUserInterface extends Request{
    body:userInterface
}

export interface userLoginInterface extends Request{
    body:{
        email:string,
        password:string
    }
}
export interface userControllerImplementation{
    createUser(req:createUserInterface, res:Response):void
    getAllUsers(req:Request,res:Response):void
    login(req:userLoginInterface,res:Response):void
}