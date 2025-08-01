import { NextFunction, Request, Response } from "express";
import { commentType } from "../types/commentType";
import { commentModel } from "../models/commentModel";
import { blogModel } from "../models/blogModel";
import { ResponseService } from "../utils/response";
import { ChechRole } from "../middleware/checkRoleMiddleware";
import { Err } from "joi";

interface IRequestComment extends ChechRole {
    body: {
        comment: string;
    }
}

const addComment = async (req: IRequestComment, res: Response,nex:NextFunction) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.user?._id;
        const commentText = req.body.comment;

        const TakeBlog = await blogModel.findByIdAndUpdate(blogId);
        if (!TakeBlog) {
            return ResponseService({
                status: 403,
                res,
                message: "Blog not found!"
            })
        }
        else {
            await commentModel.create({
                title:TakeBlog.title,
                comment: commentText,
                blog: blogId,
                user: userId,
            });
           return ResponseService({
                status: 200,
                message: "commented",
                res,
                data:commentText
            })
        }
        await blogModel.findByIdAndUpdate(blogId,{$inc:{comment:1}})
        nex()

    } catch (error) {
        const { message, stack } = error as Error
       return ResponseService({
            res,
            data: stack,
            message,
            status: 500
        })

    }
}
const getAllComments=async(req:Request,res:Response)=>{
    try {
    const getComment= await commentModel.find();
    if(getComment.length<=0){
       return ResponseService({
            res,
            message:"There is no comment on this blog. thank you",
            status:403,
        })
    }
       else{
           return ResponseService({
                res,
                status:200,
                data:getComment
            })
        }
    } catch (error) {
        const{message,stack}=error as Error
        return ResponseService({
            res,
            message,
            data:stack,
            status:500
        })
    }

}
const deleteComment=async(req:Request,res:Response)=>{
    try {
        const commentId=req.params.commentId
        const Comment=await commentModel.findById(commentId);
        if(!Comment){
           return ResponseService({
                res,
                message:"no comment to delete",
                status:403
            })
        } else{
            await commentModel.findByIdAndDelete(commentId);
           return ResponseService({
            res,
            message:"Deleted Sucessfully"
            })}
            await blogModel.findByIdAndUpdate(Comment?.blog,{$inc:{comment:-1}})
    } catch (error) {
        const {message,stack}=error as Error
      return  ResponseService({
            res,
            message,
            data:stack
        })
        
    }
    
}
const updateComment=async(req:IRequestComment, res:Response)=>{
    try {
        const commentId=req.params.commentId
        const updateData=req.body

        const updateComment=await commentModel.findByIdAndUpdate(commentId,updateData,{new:true});
        if(!updateComment){
          return  ResponseService({
                res,
                status:403,
                message:'No Comment to update.'
            })
        } else
         return ResponseService({
                res,
                status:200,
                message:'Update successfully',
                data:updateComment
            })
    
    } catch (error) {
        const {message,stack} =error as Error
       return ResponseService({
            res,
            message,
            status:500,
            data:stack
        })
        
    }
}
export { addComment,getAllComments,deleteComment,updateComment };