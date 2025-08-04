import { Request, Response } from "express";
import { ResponseService } from "../utils/response";
import { generateSlug } from "../utils/helper";
import { Op } from "sequelize";
import { Blog } from "../models/blogModel";
import { triggerBlogNotif } from "../events/AppEvents";


  // Create a new blog
  export async function createBlog(req: Request, res: Response) {
    try {
      const { title, description, author, content, is_published } = req.body;
      
      const blog = await Blog.create({
          title,
          description,
          author,
          content,
          is_published: is_published || false,
          slug: generateSlug(title),
          comment_count: 0
      });
    await triggerBlogNotif(blog);

      ResponseService({
        status: 201, 
        data:blog,
        res,
        message: 'Blog saved successfully',
        success: true
      });
    } catch (error) {
      console.error('Failed to save Blog', error);
      ResponseService({
        res,
        status: 500,
        message: 'Failed to save blog',
        data: (error as Error).message,
        success: false
      });
    }
  }

  // Get all blogs
  export async function allBlog(req: Request, res: Response) {
    try {
      const blogs = await Blog.findAll({
        where: { deleted_at: null }
      });
      
      ResponseService({
        data: blogs,
        status: 200,
        success: true,
        res,
        message: 'Blogs retrieved successfully'
      });
    } catch (error) {
      ResponseService({
        res,
        status: 500,
        message: 'Failed to fetch blogs',
        data: (error as Error).stack,
        success: false
      });
    }
  }

  // Get single blog
  export async function singleBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findOne({
        where: { id: blogId, deleted_at: null }
      });

      if (blog) {
        ResponseService({
          res,
          status: 200,
          data: blog,
          message: 'Single blog fetched successfully',
          success: true
        });
      } else {
        ResponseService({
          status: 404,
          res,
          message: 'Blog not found',
          success: false
        });
      }
    } catch (error) {
      console.error("Failed to get single blog", error);
      ResponseService({
        res,
        status: 500,
        message: 'Failed to fetch blog',
        data: (error as Error).message,
        success: false
      });
    }
  }

  // Search blogs by keyword
  export  async function blogWithKeyword(req: Request, res: Response) {
    try {
      const keyword = req.params.keyword;
      const blogs = await Blog.findAll({
        where: {
          deleted_at: null,
          [Op.or]: [
            { author: { [Op.iLike]: `%${keyword}%` } },
            { title: { [Op.iLike]: `%${keyword}%` } }
          ]
        }
      });

      if (blogs.length > 0) {
        ResponseService({
          res,
          status: 200,
          data: blogs,
          message: `Found ${blogs.length} blogs with keyword "${keyword}"`,
          success: true
        });
      } else {
        ResponseService({
          res,
          status: 404,
          message: 'No blogs found with the entered keyword',
          success: true
        });
      }
    } catch (error) {
      ResponseService({
        res,
        status: 500,
        message: 'Failed to search blogs',
        data: (error as Error).message,
        success: false
      });
    }
  }

  // Update blog
  export async function updateBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;
      const [updatedCount] = await Blog.update(req.body, {
        where: { id: blogId }
      });

      if (updatedCount > 0) {
        const updatedBlog = await Blog.findByPk(blogId);
        ResponseService({
          res,
          status: 200,
          data: updatedBlog,
          message: 'Blog updated successfully',
          success: true
        });
      } else {
        ResponseService({
          status: 404,
          res,
          message: 'Blog not found',
          success: false
        });
      }
    } catch (error) {
      console.error('Failed to update blog', error);
      ResponseService({
        res,
        status: 500,
        message: 'Failed to update blog',
        data: (error as Error).message,
        success: false
      });
    }
  }

  // Delete blog (soft delete)
export async function deleteBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;
      const deletedCount = await Blog.destroy({
        where: { id: blogId }
      });

      if (deletedCount > 0) {
        ResponseService({
          res,
          status: 200,
          message: 'Blog deleted successfully',
          success: true
        });
      } else {
        ResponseService({
          status: 404,
          res,
          message: 'Blog not found',
          success: false
        });
      }
    } catch (error) {
      console.error('Failed to delete blog', error);
      ResponseService({
        res,
        status: 500,
        message: 'Failed to delete blog',
        data: (error as Error).message,
        success: false
      });
    }
  }

  // Like a blog
export  async function likeBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;
      const result = await Blog.increment('likes_count', {
        where: { id: blogId }
      });

      // Sequelize returns [affectedRows, ...]
      if (result && result[1] && result[1] > 0) {
        return ResponseService({
          res,
          status: 200,
          message: 'Liked! Thank you!',
          success: true
        });
      } else {
        ResponseService({
          status: 404,
          res,
          message: 'Blog not found',
          success: false
        });
      }
    } catch (error) {
      ResponseService({
        res,
        status: 500,
        message: 'Failed to like blog',
        data: (error as Error).message,
        success: false
      });
    }
  }
