import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const node_env: string | undefined = process.env.NODE_ENV;
console.log(node_env);

let mongoUri: string = process.env.MONGODB_DEV_URI || ""; // Provide a default empty string

if (node_env === "development") {
  mongoUri = process.env.MONGODB_TEST_URI || "";
} else if (node_env === "production") {
  mongoUri = process.env.MONGODB_PRODUCTION_URI || "";
}

const port: number = parseInt(process.env.PORT || "5000", 10);

const jwtSecret: string = process.env.JWT_SECRET || "blablabla"; // Provide a default empty string

const jwtExpire: number = parseInt(process.env.JWT_EXPIRES || "3600", 10);

const smtpHost: string = process.env.SMTP_HOST || "";

const smtpPort: number = parseInt(process.env.SMTP_PORT || "0", 10);

const smtpUserName: string = process.env.SMTP_USERNAME || "";

const smtpPassword: string = process.env.SMTP_PASSWORD || "";

const smtpAuthMethod: string = process.env.SMTP_AUTH_METHOD || "";

const fromEmail: string = process.env.FROM_EMAIL || "";

const fromName: string = process.env.FROM_NAME || "";

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
