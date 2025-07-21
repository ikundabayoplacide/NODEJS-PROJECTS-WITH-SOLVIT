import { Request, Response } from "express";
import { Router } from "express";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { userLoginValidation } from "../schemasForValidation/userSchema.";
import { userCreateValidations } from "../schemasForValidation/userSchema.";    
import { userController } from "../controllers/userController";
import { AuthMiddleware } from "../middleware/authMIddleware";
import {checkRoleMiddleware } from "../middleware/checkRoleMiddleware";

const UserRoutes=Router();
const Controller= new userController;
UserRoutes.post('/createUser',ValidationMiddleware({type:"body",schema:userCreateValidations}),Controller.createUser);
UserRoutes.get('/getUsers',AuthMiddleware,checkRoleMiddleware,Controller.getAllUsers)
UserRoutes.post('/userLogin',ValidationMiddleware({
    type:"body",
    schema:userLoginValidation
}),Controller.login)

export {UserRoutes}
