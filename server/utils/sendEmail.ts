// Import the nodemailer library for sending emails
import nodemailer from 'nodemailer';

// Import SMTP and email configuration values from the "config" module

// Define an interface for EmailOptions, specifying the required email parameters
interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const port = parseInt(process.env.SMTP_PORT || "");

// Create a nodemailer transport object with SMTP configuration
const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP server host
    port: port, // SMTP server port
    auth: {
      user: process.env.SMTP_USERNAME, // SMTP username
      pass: process.env.SMTP_PASSWORD // SMTP password
    }
  });

// Define an asynchronous function to send an email with provided options
const sendEmail = async (options: EmailOptions): Promise<void> => {
  
  // Construct the email message object with sender, recipient, subject, and message body
  const message = {
    from: `${process.env.FROM_NAME || ''} <${process.env.FROM_EMAIL || ''}>`, // Sender's name and email
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