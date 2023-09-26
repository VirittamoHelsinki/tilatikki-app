// Import the dotenv library for environment variable configuration
import dotenv from "dotenv";

// Load environment variables from the .env file in the root of the project
dotenv.config({ path: process.cwd() + '/.env' });

console.log(require('dotenv').config())
// Retrieve the value of the NODE_ENV environment variable
const node_env = process.env.NODE_ENV;
// Log the value of NODE_ENV for debugging purposes

// Initialize the mongoUri variable with a default empty string
let mongoUri = process.env.MONGODB_DEV_URI || "";

// Update the mongoUri based on the NODE_ENV environment variable
if (node_env === "development") {
  mongoUri = process.env.MONGODB_TEST_URI || "";
} else if (node_env === "production") {
  mongoUri = process.env.MONGODB_PRODUCTION_URI || "";
}

// Parse the PORT environment variable as an integer with a default of 5000
const port = parseInt(process.env.PORT || "5000", 10);

// Retrieve the JWT_SECRET environment variable, providing a default empty string
const jwtSecret = process.env.JWT_SECRET || "";

// Parse the JWT_EXPIRES environment variable as an integer with a default of 3600
const jwtExpire = parseInt(process.env.JWT_EXPIRES || "3600", 10);

// Retrieve SMTP-related environment variables
const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = parseInt(process.env.SMTP_PORT || "0", 10);
const smtpUserName = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const smtpAuthMethod = process.env.SMTP_AUTH_METHOD || "";


// Retrieve the FROM_EMAIL and FROM_NAME environment variables
const fromEmail: string = process.env.FROM_EMAIL || "";

const fromName: string = process.env.FROM_NAME || "";

// Export all the retrieved environment variables for use in other parts of the application
export {
  node_env,
  mongoUri,
  port,
  smtpHost,
  smtpPort,
  smtpUserName,
  smtpPassword,
  smtpAuthMethod,
  jwtSecret,
  jwtExpire,
  fromEmail,
  fromName,
};