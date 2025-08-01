import joi, { object } from "joi";
import { email } from "zod";
export enum GenderEnum{
    male='male',
    female='female',
    others='others'
}
export enum roleNum{
    admin='admin',
    user='user'
}
export const userCreateValidations=joi.object({
    email:joi.string().email().required(),
    name:joi.string().required(),
    password:joi.string().min(5),
    gender:joi.string().valid(...Object.values(GenderEnum)),
    role:joi.string().valid(...Object.values(roleNum)),
    isActive:joi.boolean().default(true),
    profileImage:joi.string().optional(),
    phoneNumber:joi.string().optional().min(10).max(15).pattern(/^[0-9]+$/).messages({
        'string.pattern.base': 'Phone number must contain only digits',
        'string.min': 'Phone number must be at least 10 digits long',
        'string.max': 'Phone number must not exceed 15 digits'
    }),
    address:joi.string().optional().min(5).max(100).messages({
        'string.min': 'Address must be at least 5 characters long',
        'string.max': 'Address must not exceed 100 characters'
    }),
})

export const userLoginValidation=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
})