import dotenv from 'dotenv';



dotenv.config({ path: '../' });


const node_env: string | undefined = process.env.NODE_ENV;
console.log(node_env)

let mongoUri: string = process.env.MONGODB_DEV_URI || ''; // Provide a default empty string

if (node_env === 'development') {
  mongoUri = process.env.MONGODB_TEST_URI || '';
  console.log(mongoUri)
} else if (node_env === 'production') {
  mongoUri = process.env.MONGODB_PRODUCTION_URI || '';
}

const port: number = parseInt(process.env.PORT || '5000', 10);
console.log(port)
const secret: string = process.env.SECRET || 'test'; // Provide a default empty string
console.log(secret)

const jwtSecret: string = process.env.JWT_SECRET || 'blablabla'; // Provide a default empty string
console.log(jwtSecret)

const jwtExpire: number = parseInt(process.env.JWT_EXPIRES || '3600', 10);
console.log(jwtExpire)


export { node_env, mongoUri, port, secret, jwtSecret, jwtExpire };