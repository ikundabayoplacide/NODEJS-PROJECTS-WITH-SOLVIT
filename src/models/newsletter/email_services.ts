import nodemailer from 'nodemailer';
import { email } from 'zod';
import { ResponseService } from '../../utils/response';

const transporter = nodemailer.createTransport({
    service: 'gmail',
     host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendConfirmationMail=async(email: string, news: string,content:string) => {
    const mailOptions = {
        from:`Updates <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`New info! ${news}`,
        html:`<p> ${content}.</p>`
    };
    try {
       const info= await transporter.sendMail(mailOptions);
         console.log('Email sent:', info.messageId);
         return true;
    } catch (error) {
        console.error('Error sending newsletter:', error);
    }
}

// this is for subscribe
export const subscribeEmails=async(email:string,newsletterName:string)=>{
  const mailOptions={
    from:process.env.EMAIL_USER,
    to:email,
    subject:`You've been SUbscribed ${newsletterName}`,
    html:`<h4> Subscribed confirmed, Now you can see our updates on time! </h4>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email made subscription",email);
    
  } catch (error) {
  console.log('Failed to subscribe',error);
  }}

// this is for unsubscribe
export const unsubscribedEmail=async(email:string,newsletterName:string)=>{
  const mailOptions={
    from:process.env.EMAIL_USER,
    to:email,
    subject:`You have unsubscribed ${newsletterName}`,
    html:` <h3> You Unsubscribed on ${newsletterName} </h3>`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Unsubscription confirmation sent to ${email}`)
    
  } catch (error) {
    console.log('Failed to unsubscribe',error);
    
  }
}