import mongoose, { model,Schema } from "mongoose";
import { commentType } from "../types/commentType";

 export const commentSchema= new Schema<commentType>({
    comment:String,
    title:String,
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogs'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
},{
    timestamps:true
})
export const commentModel=model<commentType>('comments',commentSchema);