import mongoose, { model, Schema } from "mongoose";
import { BlogType } from "../types/blogType";

const blogSchema=new Schema<BlogType>({
    title:String,
    slug:String,
    description:String,
    content:String,
    author:String,
    isPublished:Boolean,
    createdAt:String,
    updatedAt:String,
    deletedAt:String,
    comment:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0,
    }

})
export const blogModel=model<BlogType>("blogs",blogSchema);