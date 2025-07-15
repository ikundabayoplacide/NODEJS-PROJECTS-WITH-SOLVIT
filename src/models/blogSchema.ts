import { model, Schema } from "mongoose";
import { BlogType } from "../type";
import { string } from "joi";

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

})
export const blogModel=model<BlogType>("blogs",blogSchema);