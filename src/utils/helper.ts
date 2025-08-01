
import { config } from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

config();

export const secretkey= process.env.JWT_SECRET||'secret';

export const hashPassword=async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const isPasswordMatch=async(plainPassword:string,hashedPassword:string):Promise<boolean>=>{
const ismatch=await bcrypt.compare(plainPassword,hashedPassword);
return ismatch
}

export const generateToken = ({ _id, email,role }: {_id:string,email:string,role:string
}):string => {
    return jwt.sign({ _id, email ,role}, secretkey, {
        expiresIn:'15min'
    })
}

export const generateSlug=(title:string):string=>{
    return title.replace(/\s+/g, '-')
}