// Import the nodemailer library for sending emails
import nodemailer, { type SendMailOptions } from 'nodemailer';
import * as config from './config.js';

// Import SMTP and email configuration values from the "config" module
// Create a nodemailer transport object with SMTP configuration
const transport = nodemailer.createTransport({
  host: config.smtpHost, // SMTP server host
  port: config.smtpPort, // SMTP server port
  secure: false, // Disable TLS/STARTTLS
  auth: {
    user: config.smtpUserName, // SMTP username
    pass: config.smtpPassword // SMTP password
  }
});

// Define an asynchronous function to send an email with provided options
async function sendEmail(payload: SendMailOptions): Promise<void> {
  // Construct the email message object with sender, recipient, subject, and message body
  const message = {
    from: `${config.fromName} <${config.fromEmail}>`, // Sender's name and email
    to: payload.to, // Recipient's email
    subject: payload.subject, // Email subject
    text: payload.text, // Email message body
  };

  // Send the email using the transport object
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(`${err} Error sending email`);
      return;
    }
    // Log a confirmation message with the messageId upon successful email sending
    console.log('Message sent: %s', info.messageId);
  })

}

// Export the sendEmail function for use in other modules
export default sendEmail;
