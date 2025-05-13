import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const email = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT, //587
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmail = {
  from: Mail.Address;
  recipients: Mail.Address;
  subject: string;
  html: string;
};

export const sendMail = async (mail: SendEmail) => {
  const { from, subject, recipients, html } = mail;

  try {
    const info = await email.sendMail({
      from,
      to: recipients,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("E-mail não enviado");
  }
};
