import {Request,Response, Router} from 'express'
import { BlogType, interfaceAddBlog } from '../type';
import { ResponseService } from '../utils/response';
import { blogModel } from '../models/blogSchema';
import { generateSlug } from '../utils/helper';
import mongoose from 'mongoose';

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
        ResponseService({
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
        ResponseService({
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

// const loginUser=async(req:Request,res:Response)=>{
//     try {
//         const userEmail=req.params.email
//         const userPass=req.params.password
//         const user=await Umodel.findOne({userEmail});
//         if(!user){
//             return res.status(400).json({message:'Invalid credentila'});
//         }
//       const isMatch=await bcrypt.compare(password,userPass);
//       if(!isMatch){
//         return res.status(400).json({message:'Password not match'});
//       }
        
//     } catch (error) {
        
//     }
// }
export{createBlog,allBlog,singleBlog,deleteBlog,updateBlog,BlogWithKeyword}