import joi, { object } from "joi";
import { email } from "zod";
export enum GenderEnum{
    male='male',
    female='female',
    others='others'
}
export enum roleNum{
    admin='admin',
    normal_user='normal_user'
}
export const userCreateValidations=joi.object({
    email:joi.string().email().required(),
    name:joi.string().required(),
    password:joi.string().min(5),
    gender:joi.string().valid(...Object.values(GenderEnum)),
    role:joi.string().valid(...Object.values(roleNum))
})

export const userLoginValidation=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
})