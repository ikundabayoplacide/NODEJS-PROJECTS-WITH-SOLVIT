import { ResponseService } from "../../utils/response";
import { sendConfirmationMail, subscribeEmails, unsubscribedEmail } from "../newsletter/email_services";
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
       
       const [subscriber,created]=await Subscriber.findOrCreate({
        where: { email, newsletterId: newsLetter.id },
        defaults: { email, newsletterId: newsLetter.id }
        });
       if(!created){
        return ResponseService({
            res,
            status:400,
            message:"Aleady subscribed",
            success:false,
            data:{
             subscribedAt: subscriber.createdAt,
            }
        })
       }
    
       await subscribeEmails(
        email,
        `Newsletter Subscription: ${newsLetter.name}`, 
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
// function for unsubscribe
export const unsubscribe=async(req:Request,res:Response)=>{
      const {email}=req.body
      const newsletterId = req.params.id;

      try {
      const newsletter=await Newsletter.findByPk(newsletterId);
      if(!newsletter){
        return ResponseService({
            res,
            message:"News letter not found",
            success:false,
            status:404
        })
      }
      const subscriber=await Subscriber.findOne({
        where:{email,newsletterId}
      })
      if(!subscriber){
        return ResponseService({
            res,
            status:404,
            message:"Subscription not Found",
            success:false
         })
       }
       await subscriber.destroy();
       await unsubscribedEmail(email,newsletter.name);
       return ResponseService({
        res,
        message:"Successfully unsubscribed",
        status:200,
        success:true,
        data:{
            email,
            newsletter:newsletter.name,
            unsubscribedAt:new Date(),
        }
       })
        
        } catch (error) {
       return ResponseService({
       res,
       status:500,
       message:"Failed to unsubscribe",
       success:true
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