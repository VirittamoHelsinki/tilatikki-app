import mongoose, { ConnectOptions } from 'mongoose';
import logger from '../configs/logger.config';

interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
}

const options: CustomConnectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongoURI = process.env.MONGODB_DEV_URI || '';

const connectMongoose = () => {
  mongoose
    .connect(mongoURI, options)
    .then(() => logger.info('connected to databases', mongoURI))
    .catch((err) => logger.error('connecting to MongoDB failed', err));
};

mongoose.set('strictQuery', true);

export default connectMongoose;