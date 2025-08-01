import {Request,Response, Router} from 'express'
import { BlogType, interfaceAddBlog } from '../types/blogType';
import { ResponseService } from '../utils/response';
import { blogModel } from '../models/blogModel';
import { generateSlug } from '../utils/helper';


 interface IRequestBlog extends Request{
    body:interfaceAddBlog
}

  const createBlog= async(req:IRequestBlog,res:Response)=>{
    try{
        const {title,description,author,content,isPublished}=req.body;
        const blog=new blogModel({
            title,
            description,
            author,
            content,
            isPublished,
            slug:generateSlug(title),
            createdAt:new Date()
        })
        const savedBlog=await blog.save();
        console.log(savedBlog);
       return ResponseService({
            status:202,
            data:blog,
            res,
            message:'Save sucessfully',
            success:true
        })
    }
    catch(error){
        console.log('Failed to sava Blog',error);

    }
    
}
// function to get all blog
 const allBlog= async (req:Request,res:Response)=>{
    try {
        const blogs=await blogModel.find();
     return ResponseService({
            data:blogs,
            status:200,
            success:true,
            res
        })
        
    } catch (error) {
        const {message,stack}=error as Error
        res.status(500).json({message,stack});
        
    }
}

const singleBlog= async(req:Request,res:Response)=>{
    try{
        const blogId=req.params.id;
   
         const Blog=await blogModel.findById(blogId);
        if(Blog){
        res.json({massage:'Single Blog fetched sucessfully', blog:Blog});
    }
    else{
        res.status(404).json({message:'Blog not Found'});
    }
} catch(error){
    console.log("Failed to get single BLog");
}
}
// // to get Blog contains word
const BlogWithKeyword= async(req:Request, res:Response)=>{
    try {

        const keyword=req.params.keyword;
        const ReturnBlogWithKeyword=await blogModel.find({
            $or: [{ author:{$regex:keyword,$options:'i'}},
                  { title:{$regex:keyword,$options:'i'}}
            ]});
          
        if(ReturnBlogWithKeyword.length>0){
            res.status(200).json({message:`All Blogs with keyword ${keyword}`,Blogs:ReturnBlogWithKeyword})
            }
            else
            res.json({message:'No Blog with Entered Keyword'});
        } catch (error) {
        res.status(500).json({message:'Failed to get Blog',error});
        
    }
}
 const updateBlog=async(req:Request,res:Response)=>{
    try{
    const blogId=req.params.id;
    const blogUpdate=await blogModel.findByIdAndUpdate(blogId);

    if(blogUpdate){
        res.json({message:'Update Successfully',blog:blogUpdate});
    }
    else{
    res.status(404).json({message:'Blog not Found'});
    }
}
catch(error){
    console.log('Failed to updated Blog',error as Error);
}
}

const deleteBlog= async(req:Request,res:Response)=>{
    try {
         const blogId=req.params.id;
    const delBlog=await blogModel.findByIdAndDelete(blogId);

    if(delBlog){
       res.json({ message: 'Blog deleted successfully', blogs: delBlog });
    }
    else{
        res.status(404).json({message:'Blog not Found'});
    }
        
    } catch (error) {
        console.log('Failed to delete blog',error as string);
        
    }
   

};

// function to like blog
const likeBlog=async(req:Request, res:Response)=>{
    try{
        const blog_Id=req.params.id;
        const blogToLike=await blogModel.findByIdAndUpdate(blog_Id,{$inc:{likes:1}},{new:true});
        if(!blogToLike){
            return ResponseService({
                status:404,
                res,
                message:"Blog not Found"
            })
        }
        else{
           return ResponseService({
                status:200,
                message:"liked! thank you!",
                res
            })
        }
    }
    catch(error){
        const{message,stack}=error as Error
       return ResponseService({
            res,
            message,
            data:stack,
            status:500
        })
    }

}

export{createBlog,allBlog,singleBlog,deleteBlog,updateBlog,BlogWithKeyword,likeBlog}