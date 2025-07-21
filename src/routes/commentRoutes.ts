import { Router } from "express";
import { commentMiddleware } from "../middleware/commentMiddleware";
import { addComment, deleteComment, getAllComments, updateComment } from "../controllers/commentsController";
import { createCommentValidate, deleteCommentValidate, updateCommentValidate, validateId } from "../schemasForValidation/commentValSchema";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import {checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

const commentRoutes=Router();

commentRoutes.post('/addComment/:blogId',commentMiddleware,ValidationMiddleware({type:'body',schema:createCommentValidate}),addComment);
commentRoutes.get('/getallcomments',checkRoleMiddleware,getAllComments);
commentRoutes.delete('/deleteComment/:commentId',checkRoleMiddleware,ValidationMiddleware({type:'params',schema:deleteCommentValidate}),deleteComment);
commentRoutes.patch('/updateComment/:commentId',checkRoleMiddleware,ValidationMiddleware({type:'body',schema:updateCommentValidate}),ValidationMiddleware({type:'params',schema:validateId}),updateComment);

export {commentRoutes}