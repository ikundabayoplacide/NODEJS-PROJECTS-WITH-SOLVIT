import {Request,Response, Router} from 'express'
import { Database, saveDatabase } from '../utils/helper';
import { BlogType } from '../type';


  const createBlog=(req:Request,res:Response)=>{
    const newBlog:BlogType={
        id:Database.length+1,
        name:req.body.name,
        title:req.body.title,
        photo:req.body.photo,
        description:req.body.description
    };
    Database.push(newBlog);
    // saveDatabase();
    res.status(200).json(newBlog);
}

 const allBlog=(req:Request,res:Response)=>{
    res.status(200).json(Database);
}

const singleBlog=(req:Request,res:Response)=>{
    const BlogId=parseInt(req.params.id);
    const Blog=Database.find((blog:{id:number})=>blog.id===BlogId);
    if(Blog){
        res.json({massage:'Single Blog fetched sucessfully', blog:Blog});
    }
    else{
        res.status(404).json({message:'Blog not Found'});
    }
}
// to get Blog contains word

const BlogWithKeyword=(req:Request, res:Response)=>{
    try {

        const keyword=req.params.keyword;
        const ReturnBlogWithKeyword=Database.filter((blog: { name: string; title: string; })=>blog.name.toLowerCase().includes(keyword.toLowerCase())|| blog.title.toLowerCase().includes(keyword.toLowerCase()));
          
        if(ReturnBlogWithKeyword.length>0){
            res.status(200).json({message:`All Blogs with keyword ${keyword}`,Blogs:ReturnBlogWithKeyword})
            }
            else
            res.json({message:'No Blog with Entered Keyword'});
        } catch (error) {
        res.status(500).json({message:'Failed to get Blog',error});
        
    }
}
 const updateBlog=(req:Request,res:Response)=>{
    const BlogId=parseInt(req.params.id);
    const BlogUpdate=Database.findIndex((update:{id:number})=>update.id === BlogId);

    if(BlogUpdate!==-1){
        Database[BlogUpdate]={...Database[BlogUpdate],...req.body};
       saveDatabase();
        res.json({message:'Update Successfully',blog:Database[BlogUpdate]});
    }
    else{
    res.status(404).json({message:'Blog not Found'});
    }

}

const deleteBlog=(req:Request,res:Response)=>{
    const BlogId=parseInt(req.params.id);
    const DelBlog=Database.findIndex((u: { id: number})=>u.id===BlogId);

    if(DelBlog!==-1){
        Database.splice(DelBlog,1);
        saveDatabase(); 
       res.json({ message: 'Blog deleted successfully', blogs: Database });
    }
    else{
        res.status(404).json({message:'Blog not Found'});
    }

};
export{createBlog,allBlog,updateBlog,deleteBlog,singleBlog,BlogWithKeyword}