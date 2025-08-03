import joi from 'joi'
export const AddBlogSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().min(20).required(),
    author: joi.string().required(),
    is_published: joi.boolean().required(),
    content:joi.string(),
    likes:joi.number()

})
export const updateBlogSchema=joi.object({
    title:joi.string().optional(),
    description:joi.string().min(20).optional(),
    author:joi.string().optional(),
    is_published:joi.boolean().optional(),
    content:joi.string().optional()
})