// Import the nodemailer library for sending emails
import nodemailer from 'nodemailer';

import * as config from './config';

// Import SMTP and email configuration values from the "config" module

// Define an interface for EmailOptions, specifying the required email parameters
interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

// Create a nodemailer transport object with SMTP configuration
const transport = nodemailer.createTransport({
    host: config.smtpHost, // SMTP server host
    port: config.smtpPort, // SMTP server port
    auth: {
      user: config.smtpUserName, // SMTP username
      pass: config.smtpPassword // SMTP password
    }
  });

// Define an asynchronous function to send an email with provided options
const sendEmail = async (options: EmailOptions): Promise<void> => {
  
  // Construct the email message object with sender, recipient, subject, and message body
  const message = {
    from: `${config.fromName} <${config.fromEmail}>`, // Sender's name and email
    to: options.email, // Recipient's email
    subject: options.subject, // Email subject
    text: options.message, // Email message body
  };

  // Send the email using the transport object and await the result
  const info = await transport.sendMail(message);

  // Log a confirmation message with the messageId upon successful email sending
  console.log('Message sent: %s', info.messageId);
};

// Export the sendEmail function for use in other modules
export default sendEmail;