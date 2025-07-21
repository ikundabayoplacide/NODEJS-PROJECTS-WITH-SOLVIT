import joi from "joi";

export const createCommentValidate=joi.object({
    comment:joi.string().required(),
})
export const deleteCommentValidate=joi.object({
    commentId:joi.string().required(),
})
export const updateCommentValidate=joi.object({
    comment:joi.string().required(),
})
export const validateId=joi.object({
    commentId:joi.string().required()
})