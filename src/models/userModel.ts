import { InferSchemaType, model, Schema } from "mongoose";

const userSchema=new Schema({
    name:String,
    role:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    isActive:Boolean,
    gender:String,
    createdAt:{
        type:Date,
        default:new Date()
    },
     updatedAt:{
        type:Date,
        default:new Date()
    },
     deleteAt:{
        type:Date,
    }
})
type Users=InferSchemaType<typeof userSchema>
export const UserModel=model<Users>('users',userSchema);