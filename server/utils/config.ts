import dotenv from 'dotenv';

dotenv.config();

const node_env: string | undefined = process.env.NODE_ENV;

let mongoUri: string = process.env.MONGODB_DEV_URI || ''; // Provide a default empty string

if (node_env === 'test') {
  mongoUri = process.env.MONGODB_TEST_URI || '';
} else if (node_env === 'production') {
  mongoUri = process.env.MONGODB_PRODUCTION_URI || '';
}

const port: number = parseInt(process.env.PORT || '5000', 10);
const secret: string = process.env.SECRET || ''; // Provide a default empty string
const jwtSecret: string = process.env.JWT_SECRET || ''; // Provide a default empty string
const jwtExpire: number = parseInt(process.env.JWT_EXPIRES || '30', 10);

export { node_env, mongoUri, port, secret, jwtSecret, jwtExpire };