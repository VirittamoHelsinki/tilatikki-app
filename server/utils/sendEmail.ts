import nodemailer from 'nodemailer';
import { smtpHost, smtpPort, smtpPassword, smtpUserName, fromEmail, fromName } from "./config";


interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpUserName,
      pass: smtpPassword
    }
  });

const sendEmail = async (options: EmailOptions): Promise<void> => {

  const message = {
    from: `${fromName || ''} <${fromEmail || ''}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transport.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;