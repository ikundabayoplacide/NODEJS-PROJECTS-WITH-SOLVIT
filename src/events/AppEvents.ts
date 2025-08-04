import { Subscriber } from "../models/subscriber/model";
import { Newsletter } from "../models/newsletter/model";
import { sendConfirmationMail } from "../models/newsletter/email_services";
import { Blog } from "../models/blogModel";

export const triggerBlogNotif = async (blogsPost:Blog) => {
        const callAllSubscribers = await Subscriber.findAll({
            include: [{ model: Newsletter, as: 'newsletter' }]
        });
        for(const sub of callAllSubscribers) {
            try {
                await sendConfirmationMail(
                    sub.email,
                    `New Blog Posted: ${blogsPost.title}`,
                    `<h4>${blogsPost.description}</h4>`
                ),setTimeout(() => {
                    console.log(`Notification sent to ${sub.email} for new blog: ${blogsPost.title}`);
                }, 1000);
            } catch (error) {
                console.error(`Failed to send email to ${sub.email}:`, error);
            }
        }
    }
    export const triggerNewLetterNotification=async(newLetter:Newsletter)=>{
        const callAllSubscribers=await Subscriber.findAll();
        for(const sub of callAllSubscribers){
            try {
                await sendConfirmationMail(
                    sub.email,
                    `New NewsLetter added:${newLetter.name}`,
                    `<h3>${newLetter.description}</h3>`
                )
            } catch (error) {
                console.log("Failed to send message to Subscribed user",error);
            }
        }
    }
