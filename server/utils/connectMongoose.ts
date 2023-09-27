import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../configs/logger.config';
import * as config from './config';

interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
}

const options: CustomConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};



const connectMongoose = () => {
  mongoose
    .connect(config.mongoUri, options)
    .then(() => logger.info('connected to databases', config.mongoUri))
    .catch((err) => logger.error('connecting to MongoDB failed', err));
};

mongoose.set('strictQuery', true);

export default connectMongoose;