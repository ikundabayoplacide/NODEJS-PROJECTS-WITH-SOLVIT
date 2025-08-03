import { ResponseService } from "../../utils/response";
import { sendConfirmationMail } from "../newsletter/email_services";
import { Newsletter } from "../newsletter/model";
import { Subscriber } from "./model";
import { Request, Response } from "express";

export const subscribe = async (req: Request, res: Response) => {
    const { email } = req.body;
    const newsletterId = req.params.id;

    try {
    const newsLetter = await Newsletter.findByPk(newsletterId);
        if (!newsLetter) {
            return ResponseService({
                res,
                status: 404,
                message: "Newsletter not found",
                success: false
            });
        }
        const existSub=await Subscriber.findOne({
            where: { email, newsletterId: newsLetter.id }
        });
        if (existSub) {
            return ResponseService({
                res,
                status: 400,
                message: "You are already subscribed to this newsletter",
                success: false,
                data: {
                    subscribedAt: existSub.createdAt,
                }

            });
        }
     const [subscriber]=await Subscriber.findOrCreate({
        where: { email, newsletterId: newsLetter.id },
        defaults: { email, newsletterId: newsLetter.id }
     });
    
   await sendConfirmationMail(
        email,
        `Newsletter Subscription: ${newsLetter.name}`,
        `Hello, you have successfully subscribed to the "${newsLetter.name}" newsletter.`,
        req.body.name || email 
    );
   return ResponseService({
        res,
        status: 201,        
        message: "Subscription successful",
        success: true,
        data: subscriber
    });
    } catch (error) {
        return ResponseService({
            res,
            status: 500,
            message: "Error subscribing to newsletter",
            success: false
        });
    }
}
export const getAllSubscribers = async (req: Request, res: Response) => {
    try {
        const subscribers = await Subscriber.findAll({order: [['createdAt', 'DESC']]});
        return ResponseService({
            res,
            status: 200,
            message: "Subscribers retrieved successfully",
            success: true,
            data: subscribers
        });
    } catch (error) {
        console.error('Error retrieving subscribers:', error);
        return ResponseService({
            res,        
            status: 500,
            message: "Error retrieving subscribers",
            success: false
        });
    }
};