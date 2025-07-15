import { Router} from "express";
import { allBlog, BlogWithKeyword, createBlog, deleteBlog, singleBlog, updateBlog } from "./src/controllers/blogController";
import { ValidationMiddleware } from "./src/middleware/ValidationMiddleware";
import { AddBlogSchema, updateBlogSchema } from "./src/schemas/blogSchema";

const Blogroute=Router();

Blogroute.post('/createBlog',ValidationMiddleware({type:'body',schema:AddBlogSchema}),createBlog);
Blogroute.get('/allBlogs',ValidationMiddleware({type:'body',schema:AddBlogSchema}),allBlog);
Blogroute.get('/getSingleBlog/:id',ValidationMiddleware({type:'body',schema:AddBlogSchema}),singleBlog);
Blogroute.get('/blogWithKeyWord/:keyword',ValidationMiddleware({type:'body',schema:AddBlogSchema}),BlogWithKeyword);
Blogroute.patch('/updateBlog/:id',ValidationMiddleware({type:'body',schema:updateBlogSchema}),updateBlog);
Blogroute.delete('/removeBlog/:id',ValidationMiddleware({type:'body',schema:AddBlogSchema}),deleteBlog);

export {Blogroute};