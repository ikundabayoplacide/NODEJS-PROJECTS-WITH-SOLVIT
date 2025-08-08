import { Router } from "express";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { userLoginValidation } from "../schemasForValidation/userSchema.";
import { userCreateValidations } from "../schemasForValidation/userSchema.";    
import { userController } from "../controllers/userController";
import { AuthMiddleware } from "../middleware/authMIddleware";
import {checkRoleMiddleware } from "../middleware/checkRoleMiddleware";
import upload from "../middleware/multerUpload";
import uploadImage from "../controllers/uploadController";

const UserRoutes=Router();
const Controller= new userController;
/**
 * @swagger
 * /api/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
UserRoutes.post('/createUser',Controller.createUser);
/**
 * @swagger
 * /api/userLogin:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 */
UserRoutes.post('/userLogin',ValidationMiddleware({
    type:"body",
    schema:userLoginValidation
}),Controller.login)

/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role not allowed)
 */
UserRoutes.get('/getUsers',AuthMiddleware,checkRoleMiddleware,Controller.getAllUsers)
/**
 * @swagger
 * /api/profile_picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profileImage
 *         type: file
 *         description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
UserRoutes.post('/profile_picture',upload.single('profileImage'),uploadImage);

export {UserRoutes}
