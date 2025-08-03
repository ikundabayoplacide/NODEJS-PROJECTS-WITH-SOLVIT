import { Request, Response } from "express";
import { ResponseService } from "../../utils/response";
import { Newsletter } from "./model";


export const createNewsLetter = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const newsletter = await Newsletter.create({ name, description });
        return ResponseService({
            res,
            status: 201,
            message: "Newsletter created successfully",
            success: true,
            data: newsletter
        });
    } catch (error) {
        console.error('Error creating newsletter:', error);
        return ResponseService({
            res,
            status: 500,
            message: "Error creating newsletter",
            success: false
        });
    }
}

export const getAllNewsletters = async (req: Request, res: Response) => {
    try {
        const newsletters = await Newsletter.findAll();
        return ResponseService({
            res,
            status: 200,
            message: "Newsletters retrieved successfully",
            success: true,
            data: newsletters
        });
    } catch (error) {
        console.error('Error retrieving newsletters:', error);
        return ResponseService({
            res,
            status: 500,
            message: "Error retrieving newsletters",
            success: false
        });
    }
}


