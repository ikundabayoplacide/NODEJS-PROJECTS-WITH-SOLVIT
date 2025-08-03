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
                    `New Blog Post: ${blogsPost.title}`,
                    `Hello, a new blog post titled "${blogsPost.title}" has been published. Check it out!`,
                    sub.name 
                );
            } catch (error) {
                console.error(`Failed to send email to ${sub.email}:`, error);
            }
        }
    }
