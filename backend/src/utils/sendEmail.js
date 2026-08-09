import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async ({ email, subject, message }) => {
    await transporter.sendMail({
        from: `"ApexTech" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject,
        html: message,
    });
};

export default sendEmail;