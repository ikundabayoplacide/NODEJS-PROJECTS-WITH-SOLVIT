
import mongoose from 'mongoose';
import { config } from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

config();

import {ServerApiVersion} from "mongodb";
const URL="mongodb+srv://<db_username>:<db_password>@cluster0.cxsrtqg.mongodb.net/SolvitWithPLacide?retryWrites=true&w=majority&appName=Cluster0"
const database_url=():string=>{
    const db_username= process.env.DB_USER_NAME as string
    const db_password= process.env.DB_PASSWORD as string
    return URL?.replace("<db_username>",db_username).replace("<db_password>",db_password) as string
}
export const secretkey = process.env.JWT_SECRET || 'secret'
export const hashPassword=async(password:string):Promise<String>=>{
    return await bcrypt.hash(password,10);
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
export async function runDatabase(){
    try{
        const url=database_url();
        console.log(url);
      const connectdb=mongoose.connect(database_url(),
    {
        serverApi:{
            version:ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true
        }
    }
)
    console.log('connected sucessfully');
} 
catch(error){
    console.log('Failed to connect to database',error as Error);
}}
runDatabase().catch(console.dir);

export const generateSlug=(title:string):string=>{
    return title.replace(/\s+/g, '-')
}