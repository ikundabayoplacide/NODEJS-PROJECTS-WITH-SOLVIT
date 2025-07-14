import { Router} from "express";
import { allBlog, BlogWithKeyword, createBlog, deleteBlog, singleBlog, updateBlog } from "./src/controllers/blogController";

const Blogroute=Router();

Blogroute.post('/createBlog',createBlog);
Blogroute.get('/allBlogs',allBlog);
Blogroute.get('/getSingleBlog/:id',singleBlog);
Blogroute.get('/blogWithKeyWord/:keyword',BlogWithKeyword);
Blogroute.put('/updateBlog/:id',updateBlog);
Blogroute.delete('/removeBlog/:id',deleteBlog);

export {Blogroute};