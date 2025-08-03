import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendConfirmationMail=async(email: string, newsletterName: string, p0: string, name: any) => {
    const mailOptions = {
        from:`updates <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`Subscription confirmed!${newsletterName}`,
        html:`<h2> Thank you!</h2>
        <p> You have successfully subscribed to our newsletter.</p>`
    };

    try {
       const info= await transporter.sendMail(mailOptions);
         console.log('Email sent:', info.messageId);
         return true;
    } catch (error) {
        console.error('Error sending newsletter:', error);
    }
}