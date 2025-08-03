import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { ChechRole } from "../middleware/checkRoleMiddleware";
import { Blog } from "../models/blogModel";
import {Comment} from "../models/commentModel";

interface IRequestComment extends ChechRole {
    body: {
        comment: string;
    }
}

const addComment=async(req: IRequestComment, res: Response,nex:NextFunction)=>{
    try {
        const blogId = parseInt(req.params.blogId);
        const userId = req.user?._id;
        const commentText = req.body.comment;

        const blog   = await Blog.findByPk(blogId);
        if (!blog) {
            return ResponseService({
                status: 403,
                res,
                message: "Blog not found!"
            })
        }
            const newComment= await Comment.create({
                comment: commentText,
                blogId: blogId,
                userId: Number(userId),
                id: 0
            });
            await Blog.increment('comment_count', { by: 1, where: { id: blogId } });

           return ResponseService({
                status: 201,
                message: "commented successfully",
                res,
                data:{
                    id:newComment.id,
                    comment: newComment.comment,
                }
            })
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
        const blogId=parseInt(req.params.blogId);
    const blog_comments= await Comment.findAll({where:{blogId:blogId}});

    if(blog_comments.length===0){
       return ResponseService({
            res,
            message:"There is no comment on this blog. thank you",
            status:200,
        })
    }
      ResponseService({
                res,
                status:200,
                data:blog_comments
            })
        
    } catch (error) {
        return ResponseService({
            res,
            message:"Failed to get comments",
            data:(error as Error).message,
            status:500
        })
    }

}
const deleteComment=async(req:Request,res:Response)=>{
    try {
        const commentId=req.params.commentId
        const comment=await Comment.findByPk(commentId);
        if(!comment){
           return ResponseService({
                res,
                message:"no comment to delete",
                status:404
            })
        } 
        else{
            await Comment.destroy();
            await Blog.decrement('comment_count', { by: 1, where: { id: comment.blogId } });
           return ResponseService({
            res,
            message:"Deleted comment Sucessfully"
            })}
    } catch (error) {
      return  ResponseService({
            status:500,
            data:(error as Error).message,
            res,
            message:"Failed to delete comment",
        })
        
    }
    
}
const updateComment=async(req:IRequestComment, res:Response)=>{
    try {
        const commentId=parseInt(req.params.commentId)

        const commentText = req.body.comment;

        const updateComment = await Comment.update(
            { comment: commentText },
            { where: { id: commentId } }
        );
        if (!updateComment || updateComment[0] === 0) {
            return ResponseService({
                res,
                status: 403,
                message: 'No Comment to update.',
                success:false
            });
        } 
   const newComment = await Comment.findByPk(commentId);
        return ResponseService({
            res,
            status: 200,
            data: newComment,
            message: 'Comment updated successfully',
            success: true
        });
    
    } catch (error) {
       return ResponseService({
            res,
            message:'Failed to update comment',
            status:500,
            data: (error as Error).message,
            success: false
        })
        
    }
}
export { addComment,getAllComments,deleteComment,updateComment };