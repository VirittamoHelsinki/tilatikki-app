import dotenv from 'dotenv';

dotenv.config();

const node_env = process.env.NODE_ENV;

let mongoUri = process.env.MONGODB_DEV_URI || ''; // Provide a default empty string

if (node_env === 'test') mongoUri = process.env.MONGODB_TEST_URI || '';
else if (node_env === 'production') mongoUri = process.env.MONGODB_PRODUCTION_URI || '';

const port = process.env.PORT || 5000;
const secret = process.env.SECRET || ''; // Provide a default empty string

export { node_env, mongoUri, port, secret };