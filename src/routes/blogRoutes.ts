import { Router} from "express";
import { allBlog, BlogWithKeyword, createBlog, deleteBlog, likeBlog, singleBlog, updateBlog } from "../controllers/blogController";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { AddBlogSchema, updateBlogSchema } from "../schemasForValidation/blogSchema";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

const Blogroute=Router();

Blogroute.post('/createBlog',checkRoleMiddleware,ValidationMiddleware({type:'body',schema:AddBlogSchema}),createBlog);
Blogroute.get('/allBlogs',ValidationMiddleware({type:'body',schema:AddBlogSchema}),allBlog);
Blogroute.get('/getSingleBlog/:id',ValidationMiddleware({type:'body',schema:AddBlogSchema}),singleBlog);
Blogroute.get('/blogWithKeyWord/:keyword',ValidationMiddleware({type:'body',schema:AddBlogSchema}),BlogWithKeyword);
Blogroute.patch('/updateBlog/:id',checkRoleMiddleware,ValidationMiddleware({type:'body',schema:updateBlogSchema}),updateBlog);
Blogroute.delete('/removeBlog/:id',checkRoleMiddleware,ValidationMiddleware({type:'body',schema:AddBlogSchema}),deleteBlog);
Blogroute.post('/likeBlog/:id/like',likeBlog);

export {Blogroute};