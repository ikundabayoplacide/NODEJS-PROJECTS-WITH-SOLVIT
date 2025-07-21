import { Request, Response } from "express";
import { createUserInterface, userControllerImplementation, userLoginInterface } from "../types/userType";
import { UserModel } from "../models/userModel";
import { ResponseService } from "../utils/response";
import { generateToken, hashPassword, isPasswordMatch } from "../utils/helper";
import { RequestedUser } from "../middleware/authMIddleware";


export class userController implements userControllerImplementation{
    public async createUser(req: createUserInterface, res: Response){
        try{
            const {email,name,gender,password}=req.body
            const userExist=await UserModel.exists({
                email
            })
            if(userExist){
                ResponseService({
                    data:null,
                    res,
                    status:400,
                    message:"user arleady exists"
                })
            }
    const user=new UserModel({
        email,
        role:'user',
        password:await hashPassword(password),
        name,
        gender,
        isActive:true,
        createdAt:new Date()
    })
    await user.save()
    ResponseService({
        data:user,
        status:201,
        res,
        message:"created user sucessfully"
    })   
        }
        catch(error){
            const{message,stack}=error as Error
            ResponseService({
                data:stack,
                res,
                message,
                status:500,
                success:false
            })
        }
    }
    public async getAllUsers(req: RequestedUser, res: Response) {
        try {
            // const _id=req?.user?._id as string
            const user=await UserModel.find({
                // _id:_id as unknown as ObjectId
            })
            ResponseService({
                res,
                data:user,
                message:"user Details"
            })  
        } catch (error) {
            const {message,stack}=error as Error
            ResponseService({
                res,
                data:stack,
                message,
                status:500,
                success:false
            })
        }
        }

        public async login(req: userLoginInterface, res: Response) {
            try {
                const{email,password}=req.body
                const user=await UserModel.findOne({
                    email
                })
                if(!user){
                    ResponseService({
                        res,
                        status:404,
                        data:null,
                        message:"User not Found, PLease signin"
                    })
                }
                const isMatchingPass=await isPasswordMatch(password,user?.password as string);
                if(!isMatchingPass){
                    ResponseService({
                        message:"Invalid Credentials",
                        res,
                        status:401
                    })
                }
                const token=generateToken({_id:user?._id.toString() as string, email:user?.email as string,role:user?.role as string});
                ResponseService({
                    token:token,
                    res,
                    message:"User Login Sucessfully",
                    status:201,
                    success:true
                })
            } catch (error) {
                const {message,stack}=error as Error
                ResponseService({
                    res,
                    message,
                    status:500,
                    success:true,
                    data:stack
                })
                
            }
            
        
    }
}