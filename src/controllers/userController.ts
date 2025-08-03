import { Request, Response } from "express";
import { createUserInterface, userControllerImplementation, userLoginInterface } from "../types/userType";
import {User} from "../models/userModel";
import { ResponseService } from "../utils/response";
import { generateToken, hashPassword, isPasswordMatch } from "../utils/helper";
import { RequestedUser } from "../middleware/authMIddleware";


export class userController implements userControllerImplementation{
    public async createUser(req: createUserInterface, res: Response){
        try{
            const {email, name, gender, password, role} = req.body;
            const userExist = await User.findOne({ where: { email } });
            if (userExist) {
           return ResponseService({
                    data: null,
                    res,
                    status: 400,
                    message: "user arleady exists"
                })
            }
    const user = await User.create({
        email,
        password: await hashPassword(password),
        name,
        gender,
        role: role || 'user',
        isActive: true,
    })
    await user.save()
   return ResponseService({
        data:user,
        status:201,
        res,
        message:"created user sucessfully"
    })   
        }
        catch(error){
             console.error("🔥 CREATE USER ERROR:", error); 
            const{message,stack}=error as Error
          return ResponseService({
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
            const user=await User.findAll({
                where:{deleted_at:null}
            })
            return ResponseService({
                res,
                data:user,
                message:"users retreved Sucessfully",
                status:200,
                success:true
            })  
        } catch (error) {
            const {message,stack}=error as Error
            return ResponseService({
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
                const user=await User.findOne({
                    where:{email,deleted_at:null}
                })
                if(!user){
                   return ResponseService({
                        res,
                        status:404,
                        data:null,
                        message:"User not Found, PLease signin"
                    })
                }
                const isMatchingPass=await isPasswordMatch(password,user?.password as string);
                if(!isMatchingPass){
                   return ResponseService({
                        message:"Invalid Credentials",
                        res,
                        status:401
                    })
                }
                const token=generateToken({_id:user?.id.toString() as string, email:user?.email as string,role:user?.role as string});
               return ResponseService({
                    token:token,
                    res,
                    message:"User Login Sucessfully",
                    status:201,
                    success:true
                })
            } catch (error) {
                const {message,stack}=error as Error
               return ResponseService({
                    res,
                    message,
                    status:500,
                    success:true,
                    data:stack
                })
                
            }
            
        
    }
}